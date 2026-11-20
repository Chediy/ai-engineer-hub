#!/usr/bin/env node
/* Translation checker — run: node tools/check-i18n.js
   Verifies every language has every string (UI, static page text, data, content, quiz),
   with matching structure and {placeholders}. Exits 1 if anything is missing. */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const LANGS = ["fr", "de"];
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

function merge(a, b) { for (const k of Object.keys(b)) { const v = b[k]; if (v && typeof v === "object" && !Array.isArray(v)) { a[k] = a[k] || {}; merge(a[k], v); } else a[k] = v; } return a; }
function run(files) {
  const packs = {}; const ctx = { window: {}, console };
  ctx.I18N = { add: (l, p) => (packs[l] = merge(packs[l] || {}, p)) };
  vm.createContext(ctx);
  for (const f of files) if (fs.existsSync(path.join(ROOT, f))) vm.runInContext(read(f), ctx, { filename: f });
  return { win: ctx.window, packs };
}

const src = run(["assets/js/data.js", "assets/js/quiz-data.js", "assets/js/content.js", "assets/i18n/en/ui.js"]);
const D = src.win.AI_DATA, C = src.win.AI_CONTENT, BANK = src.win.QUIZ_BANK, EN = src.packs.en.ui;
const html = read("index.html");
const staticKeys = new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]));
[...html.matchAll(/data-i18n-attr="([^"]+)"/g)].forEach((m) => m[1].split(";").forEach((p) => { const k = (p.split("=")[1] || "").trim(); if (k) staticKeys.add(k); }));

let failed = false;
for (const lang of LANGS) {
  const files = ["ui", "data", "content", "quiz"].map((f) => `assets/i18n/${lang}/${f}.js`);
  const P = run(files).packs[lang] || {};
  const problems = [], extras = [];
  const miss = (where) => problems.push(where);
  const str = (v) => typeof v === "string" && v.trim() !== "";
  const arr = (v, n, where) => { if (!Array.isArray(v)) return miss(where), false; if (n != null && v.length !== n) problems.push(`${where} (expected ${n} items, got ${v.length})`); return true; };
  const keysOf = (o) => Object.keys(o || {});
  const extra = (obj, valid, where) => keysOf(obj).forEach((k) => { if (!valid.includes(k)) extras.push(`${where}.${k}`); });

  // UI + static
  const ui = P.ui || {};
  const uiKeys = [...new Set([...Object.keys(EN), ...staticKeys])];
  uiKeys.forEach((k) => { if (!str(ui[k])) miss(`ui.${k}`); });
  extra(ui, uiKeys, "ui");
  Object.keys(EN).forEach((k) => { if (!str(ui[k])) return;
    const need = (EN[k].match(/\{\w+\}/g) || []).sort().join(), got = (ui[k].match(/\{\w+\}/g) || []).sort().join();
    if (need !== got) problems.push(`ui.${k} placeholders ${got || "none"} ≠ ${need}`); });

  // data
  const d = P.data || {};
  keysOf(D.topics).forEach((k) => str((d.topics || {})[k]) || miss(`data.topics.${k}`));
  keysOf(D.levels).forEach((k) => { const v = (d.levels || {})[k]; arr(v, 2, `data.levels.${k}`); });
  keysOf(D.formats).forEach((k) => str((d.formats || {})[k]) || miss(`data.formats.${k}`));
  keysOf(D.providers).forEach((k) => str((d.providers || {})[k]) || miss(`data.providers.${k}`));
  D.courses.forEach((c) => str((d.courses || {})[c.id]) || miss(`data.courses.${c.id}`));
  extra(d.courses, D.courses.map((c) => c.id), "data.courses");
  D.roadmap.forEach((st) => { const v = (d.roadmap || {})[st.level]; if (arr(v, 3, `data.roadmap.${st.level}`)) arr(v[2], st.steps.length, `data.roadmap.${st.level} steps`); });
  D.openModels.forEach((m) => arr((d.openModels || {})[m.family], 3, `data.openModels.${m.family}`));
  D.localTools.forEach((x) => arr((d.localTools || {})[x.name], 2, `data.localTools.${x.name}`));
  if (arr(d.hardwareTiers, D.hardwareTiers.length, "data.hardwareTiers")) d.hardwareTiers.forEach((v, i) => arr(v, 5, `data.hardwareTiers[${i}]`));
  arr(d.futureReasons, D.futureReasons.length, "data.futureReasons");
  if (arr(d.updates, D.updates.length, "data.updates")) D.updates.forEach((g, i) => d.updates[i] && arr(d.updates[i][1], g.items.length, `data.updates[${i}] items`));
  arr(d.trends, D.trends.length, "data.trends");
  if (!d.dur) miss("data.dur");

  // content
  const c = P.content || {};
  C.concepts.forEach((co) => { const v = (c.concepts || {})[co.id]; if (!v) return miss(`content.concepts.${co.id}`);
    ["title", "tagline", "loop"].forEach((f) => str(v[f]) || miss(`content.concepts.${co.id}.${f}`));
    arr(v.body, co.body.length, `content.concepts.${co.id}.body`); arr(v.flow, co.flow.length, `content.concepts.${co.id}.flow`); arr(v.terms, co.terms.length, `content.concepts.${co.id}.terms`); });
  C.deploy.forEach((x) => arr((c.deploy || {})[x.id], 2, `content.deploy.${x.id}`));
  C.stack.forEach((l) => { const v = (c.stack || {})[l.id]; if (arr(v, 3, `content.stack.${l.id}`)) arr(v[2], l.concepts.length, `content.stack.${l.id} concepts`); });
  if (arr(c.stackOps, 3, "content.stackOps")) arr(c.stackOps[2], C.stackOps.concepts.length, "content.stackOps concepts");
  arr(c.harnessParts, C.harnessParts.length, "content.harnessParts");
  C.harnessExamples.forEach((x) => arr((c.harnessExamples || {})[x.name], 2, `content.harnessExamples.${x.name}`));
  arr(c.harnessRules, C.harnessRules.length, "content.harnessRules");

  // quiz
  const q = P.quiz || {};
  BANK.forEach((x) => { const v = q[x.id]; if (arr(v, 3, `quiz.${x.id}`)) { str(v[0]) || miss(`quiz.${x.id} question`); arr(v[1], x.o.length, `quiz.${x.id} options`); str(v[2]) || miss(`quiz.${x.id} explanation`); } });
  extra(q, BANK.map((x) => x.id), "quiz");

  const n = problems.length;
  console.log(`\n[${lang}] ${n ? "✗ " + n + " problem(s)" : "✓ complete"}${extras.length ? ` · ${extras.length} unused key(s)` : ""}`);
  problems.slice(0, 40).forEach((p) => console.log("   missing/invalid: " + p));
  if (n > 40) console.log(`   … and ${n - 40} more`);
  extras.slice(0, 15).forEach((p) => console.log("   unused (stale?): " + p));
  if (n) failed = true;
}
console.log(failed ? "\nSome translations are missing — the site falls back to English for those strings.\n" : "\nAll translations complete.\n");
process.exit(failed ? 1 : 0);
