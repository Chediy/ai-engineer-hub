(() => {
  "use strict";
  const D = window.AI_DATA, C = window.AI_CONTENT, BANK = window.QUIZ_BANK, I18N = window.I18N;
  const t = (k, v) => I18N.t(k, v);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const LEVELS = ["beginner", "intermediate", "professional"];
  const LV_COLOR = { beginner: "var(--beginner)", intermediate: "var(--intermediate)", professional: "var(--professional)" };
  const courseById = Object.fromEntries(D.courses.map((c) => [c.id, c]));
  const quizById = Object.fromEntries(BANK.map((q) => [q.id, q]));

  /* =================== i18n: localize data in place =================== */
  const PRISTINE = JSON.parse(JSON.stringify({ D, C, BANK }));
  function restore(target, src) { // copy every English string back
    for (const k of Object.keys(src)) {
      const v = src[k];
      if (typeof v === "string") target[k] = v;
      else if (v && typeof v === "object" && target[k] && typeof target[k] === "object") restore(target[k], v);
    }
  }
  const put = (obj, field, val) => { if (typeof val === "string" && val) obj[field] = val; };
  const putArr = (arr, vals) => { if (Array.isArray(vals)) vals.forEach((v, i) => { if (i < arr.length) put(arr, i, v); }); };
  function localize() {
    restore({ D, C, BANK }, PRISTINE);
    if (I18N.lang === "en") return;
    const P = I18N.pack(), d = P.data || {}, c = P.content || {}, q = P.quiz || {};
    Object.entries(d.topics || {}).forEach(([k, v]) => D.topics[k] && put(D.topics[k], "label", v));
    Object.entries(d.levels || {}).forEach(([k, v]) => { if (D.levels[k] && v) { put(D.levels[k], "label", v[0]); put(D.levels[k], "desc", v[1]); } });
    Object.entries(d.formats || {}).forEach(([k, v]) => D.formats[k] && put(D.formats[k], "label", v));
    Object.entries(d.providers || {}).forEach(([k, v]) => D.providers[k] && put(D.providers[k], "blurb", v));
    Object.entries(d.providerNames || {}).forEach(([k, v]) => D.providers[k] && put(D.providers[k], "name", v));
    const dur = d.dur || {}, durKeys = Object.keys(dur).sort((a, b) => b.length - a.length);
    const durL = (s) => durKeys.reduce((acc, k) => acc.split(k).join(dur[k]), s);
    D.courses.forEach((co) => { put(co, "desc", (d.courses || {})[co.id]); co.duration = durL(co.duration); });
    D.roadmap.forEach((st) => {
      const v = (d.roadmap || {})[st.level]; if (!v) return;
      put(st, "title", v[0]); put(st, "duration", v[1]);
      (v[2] || []).forEach((sv, i) => { if (st.steps[i] && sv) { put(st.steps[i], "t", sv[0]); put(st.steps[i], "d", sv[1]); } });
    });
    D.openModels.forEach((m) => { const v = (d.openModels || {})[m.family]; if (v) { put(m, "sizes", v[0]); put(m, "strengths", v[1]); put(m, "license", v[2]); } });
    D.localTools.forEach((x) => { const v = (d.localTools || {})[x.name]; if (v) { put(x, "desc", v[0]); put(x, "best", v[1]); } });
    (d.hardwareTiers || []).forEach((v, i) => { const h = D.hardwareTiers[i]; if (h && v) ["tier", "mem", "models", "use", "speed"].forEach((f, j) => put(h, f, v[j])); });
    (d.futureReasons || []).forEach((v, i) => { const r = D.futureReasons[i]; if (r && v) { put(r, "t", v[0]); put(r, "d", v[1]); } });
    (d.updates || []).forEach((v, i) => { const g = D.updates[i]; if (g && v) { put(g, "cat", v[0]); (v[1] || []).forEach((dd, j) => g.items[j] && put(g.items[j], "d", dd)); } });
    (d.trends || []).forEach((v, i) => { const r = D.trends[i]; if (r && v) { put(r, "t", v[0]); put(r, "d", v[1]); } });
    C.concepts.forEach((co) => {
      const v = (c.concepts || {})[co.id]; if (!v) return;
      put(co, "title", v.title); put(co, "tagline", v.tagline); put(co, "loop", v.loop);
      putArr(co.body, v.body); putArr(co.flow, v.flow);
      (v.terms || []).forEach((tv, i) => co.terms[i] && putArr(co.terms[i], tv));
    });
    C.deploy.forEach((x) => { const v = (c.deploy || {})[x.id]; if (v) { put(x, "label", v[0]); put(x, "note", v[1]); } });
    const stackL = (l, v) => { if (v) { put(l, "t", v[0]); put(l, "d", v[1]); putArr(l.concepts, v[2]); } };
    C.stack.forEach((l) => stackL(l, (c.stack || {})[l.id]));
    stackL(C.stackOps, c.stackOps);
    (c.harnessParts || []).forEach((v, i) => { const p = C.harnessParts[i]; if (p && v) { put(p, "t", v[0]); put(p, "d", v[1]); } });
    C.harnessExamples.forEach((x) => { const v = (c.harnessExamples || {})[x.name]; if (v) { put(x, "desc", v[0]); put(x, "best", v[1]); } });
    putArr(C.harnessRules, c.harnessRules);
    BANK.forEach((qq) => { const v = q[qq.id]; if (v) { put(qq, "q", v[0]); putArr(qq.o, v[1]); put(qq, "e", v[2]); } });
  }

  /* ---------------- storage (safe) ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("aih-" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("aih-" + k, JSON.stringify(v)); } catch (e) {} }
  };
  const done = new Set(store.get("done", []));
  const saved = new Set(store.get("saved", []));
  const persist = () => { store.set("done", [...done]); store.set("saved", [...saved]); };

  let toastT;
  const toast = (msg) => { const el = $("#toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("show"), 2200); };

  const monoBadge = (pk) => { const p = D.providers[pk]; return `<span class="mono-badge" style="background:${p.color}" aria-hidden="true">${esc(p.mono)}</span>`; };
  const lvBadge = (lv) => `<span class="badge lv-${lv}">${D.levels[lv].icon} ${esc(D.levels[lv].label)}</span>`;
  const costLabel = (c) => t("cost." + c);
  const inLang = (c) => I18N.lang !== "en" && c.langs && c.langs.includes(I18N.lang);
  const langBadge = (c) => inLang(c) ? `<span class="badge free" title="${esc(t("card.inLang"))}">${I18N.lang.toUpperCase()} ✓</span>` : "";

  /* ---------------- code blocks ---------------- */
  function highlight(code) {
    return esc(code).split("\n").map((line) => {
      const m = line.match(/^(\s*)(#|\/\/|\[ \])(.*)$/);
      if (m && m[2] !== "[ ]") return `${m[1]}<span class="c">${m[2]}${m[3]}</span>`;
      const i = line.indexOf("  # ");
      if (i > -1) return line.slice(0, i) + `<span class="c">${line.slice(i)}</span>`;
      return line;
    }).join("\n");
  }
  const codeBlock = (code, lang) => `<div class="code"><div class="code-head"><span class="dots"><i></i><i></i><i></i> ${esc(lang)}</span><button class="copy-btn" type="button">Copy</button></div><pre><code>${highlight(code)}</code></pre></div>`;
  document.addEventListener("click", async (e) => {
    const b = e.target.closest(".copy-btn"); if (!b) return;
    const txt = b.closest(".code").querySelector("code").innerText;
    try { await navigator.clipboard.writeText(txt); b.textContent = "✓"; } catch (err) { b.textContent = "⚠"; }
    setTimeout(() => (b.textContent = "Copy"), 1600);
  });

  /* ---------------- hero stats & progress ---------------- */
  function renderStats() {
    const free = D.courses.filter((c) => c.cost === "free").length;
    $("#heroStats").innerHTML = [
      [D.courses.length, t("stat.resources")], [Object.keys(D.providers).length, t("stat.providers")],
      [BANK.length, t("stat.quiz")], [Math.round((free / D.courses.length) * 100) + "%", t("stat.free")]
    ].map(([n, l]) => `<div class="stat"><b>${n}</b><span>${esc(l)}</span></div>`).join("");
  }
  function renderProgress() {
    const bars = LEVELS.map((lv) => {
      const all = D.courses.filter((c) => c.level === lv);
      const n = all.filter((c) => done.has(c.id)).length;
      const pct = all.length ? Math.round((n / all.length) * 100) : 0;
      return `<div><div class="bar-label"><span>${D.levels[lv].icon} ${esc(D.levels[lv].label)}</span><span>${n}/${all.length}</span></div><div class="bar"><i style="width:${pct}%;background:${LV_COLOR[lv]}"></i></div></div>`;
    }).join("");
    $("#progressCard").innerHTML = `<div class="pc-title">${t("prog.title")}<small>${esc(t("prog.sub", { done: done.size, saved: saved.size }))}</small></div>${bars}`;
  }

  /* ---------------- roadmap ---------------- */
  let roadLv = "beginner";
  const miniCourse = (c, extra = "") => `<a class="mini" href="${c.url}" target="_blank" rel="noopener">${monoBadge(c.provider)}<span class="m-title">${esc(c.title)}</span>${extra}${langBadge(c)}</a>`;
  function renderRoadmap() {
    $("#roadmapTabs").innerHTML = LEVELS.map((lv) => `<button class="level-tab ${lv === roadLv ? "on" : ""}" role="tab" aria-selected="${lv === roadLv}" data-lv="${lv}"><b>${D.levels[lv].icon} ${esc(D.levels[lv].label)}</b><small>${esc(D.levels[lv].desc)}</small></button>`).join("");
    const st = D.roadmap.find((s) => s.level === roadLv);
    const openIdx = $$("#roadmapBody details[open]").map((d) => d.dataset.n);
    $("#roadmapBody").innerHTML = `<div class="stage-head"><h3>${esc(st.title)}</h3><span class="badge">⏱ ${esc(st.duration)}</span></div>
      <div class="timeline">${st.steps.map((s, i) => {
        const complete = s.res.every((id) => done.has(id));
        const open = openIdx.length ? openIdx.includes(String(i + 1)) : i === 0;
        return `<details class="step ${complete ? "complete" : ""}" data-n="${i + 1}" ${open ? "open" : ""}>
          <summary><h4>${esc(s.t)}</h4><span class="chev">›</span></summary>
          <div class="step-body"><p>${esc(s.d)}</p><div class="mini-list">${s.res.map((id) => {
            const c = courseById[id]; if (!c) return "";
            return miniCourse(c, `<span class="badge">${D.formats[c.format].icon} ${esc(D.formats[c.format].label)}</span>${done.has(id) ? '<span class="badge free">✓</span>' : ""}`);
          }).join("")}</div></div></details>`;
      }).join("")}</div>
      <p class="fine" style="margin-top:14px">${esc(t("road.tip"))}</p>`;
  }
  $("#roadmapTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-lv]"); if (b) { roadLv = b.dataset.lv; $("#roadmapBody").innerHTML = ""; renderRoadmap(); } });

  /* ---------------- concepts ---------------- */
  let conceptId = "llm";
  function renderConcepts() {
    $("#conceptTabs").innerHTML = C.concepts.map((c) => `<button class="concept-tab ${c.id === conceptId ? "on" : ""}" role="tab" aria-selected="${c.id === conceptId}" data-id="${c.id}">${c.icon} ${esc(c.title)}</button>`).join("");
    const c = C.concepts.find((x) => x.id === conceptId);
    const related = D.courses.filter((x) => x.topics.includes(c.id)).slice(0, 4);
    $("#conceptBody").innerHTML = `
      <div class="card"><h3>${c.icon} ${esc(c.title)}</h3><div class="tag">${esc(c.tagline)}</div>
        ${c.body.map((p) => `<p>${p}</p>`).join("")}
        <div class="flow" aria-label="${esc(t("concept.diagram"))}">${c.flow.map((n, i) => `${i ? '<span class="arrow">→</span>' : ""}<span class="node">${esc(n)}</span>`).join("")}</div>
        <div class="flow-loop">↻ ${esc(c.loop)}</div>
        <div class="terms">${c.terms.map(([tt, dd]) => `<div class="term"><b>${esc(tt)}</b><span>${esc(dd)}</span></div>`).join("")}</div>
      </div>
      <div class="card">${codeBlock(c.code, "python")}
        <h4 style="margin-top:20px">${esc(t("concept.deeper"))}</h4>
        <div class="mini-list">${related.map((r) => miniCourse(r, lvBadge(r.level))).join("")}</div>
        <button class="btn small ghost" style="margin-top:12px" data-goto-topic="${c.id}">${esc(t("concept.seeAll", { topic: D.topics[c.id].label }))}</button>
      </div>`;
  }
  $("#conceptTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-id]"); if (b) { conceptId = b.dataset.id; renderConcepts(); } });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-goto-topic]"); if (!b) return;
    resetFilters(); F.topic = b.dataset.gotoTopic; renderFilters(); renderCourses();
    $("#courses").scrollIntoView();
  });

  /* ---------------- courses ---------------- */
  const F = { q: "", level: "", topic: "", provider: "", format: "", cost: "", status: "" };
  function resetFilters() { Object.keys(F).forEach((k) => (F[k] = "")); $("#search").value = ""; ["#providerSel", "#formatSel", "#costSel", "#statusSel"].forEach((s) => ($(s).value = "")); }
  function renderFilters() {
    $("#levelChips").innerHTML = [["", t("f.allLevels")], ...LEVELS.map((l) => [l, `${D.levels[l].icon} ${esc(D.levels[l].label)}`])]
      .map(([v, l]) => `<button class="chip ${F.level === v ? "on" : ""}" data-level="${v}" aria-pressed="${F.level === v}">${l}</button>`).join("");
    $("#topicChips").innerHTML = [["", t("f.allTopics")], ...Object.entries(D.topics).map(([k, tp]) => [k, `${tp.icon} ${esc(tp.label)}`])]
      .map(([v, l]) => `<button class="chip ${F.topic === v ? "on" : ""}" data-topic="${v}" aria-pressed="${F.topic === v}">${l}</button>`).join("");
  }
  function initSelects() {
    $("#providerSel").innerHTML = `<option value="">${esc(t("f.allOpt"))}</option>` + Object.entries(D.providers).map(([k, p]) => `<option value="${k}">${esc(p.name)}</option>`).join("");
    $("#formatSel").innerHTML = `<option value="">${esc(t("f.allOpt"))}</option>` + Object.entries(D.formats).map(([k, f]) => `<option value="${k}">${f.icon} ${esc(f.label)}</option>`).join("");
    $("#providerSel").value = F.provider; $("#formatSel").value = F.format;
  }
  function matches(c) {
    if (F.level && c.level !== F.level) return false;
    if (F.topic && !c.topics.includes(F.topic)) return false;
    if (F.provider && c.provider !== F.provider) return false;
    if (F.format && c.format !== F.format) return false;
    if (F.cost && c.cost !== F.cost) return false;
    if (F.status === "saved" && !saved.has(c.id)) return false;
    if (F.status === "done" && !done.has(c.id)) return false;
    if (F.status === "todo" && done.has(c.id)) return false;
    if (F.q) {
      const hay = [c.title, c.desc, D.providers[c.provider].name, ...c.topics.map((tp) => D.topics[tp].label), D.levels[c.level].label, c.level, D.formats[c.format].label].join(" ").toLowerCase();
      if (!F.q.split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  }
  function courseCard(c) {
    const tp = D.topics[c.topics[0]], f = D.formats[c.format];
    const t2 = D.topics[c.topics[1]] || tp;
    return `<article class="course ${done.has(c.id) ? "is-done" : ""}" data-id="${c.id}">
      <div class="thumb" style="background:linear-gradient(135deg, ${tp.color}, ${t2.color === tp.color ? D.providers[c.provider].color : t2.color})">
        <span class="t-icon" aria-hidden="true">${tp.icon}</span>
        <span class="t-meta"><span class="fmt">${f.icon} ${esc(f.label)}</span><br>⏱ ${esc(c.duration)}</span>
      </div>
      <div class="course-body">
        <div class="prov">${monoBadge(c.provider)} ${esc(D.providers[c.provider].name)}</div>
        <h3><a href="${c.url}" target="_blank" rel="noopener">${esc(c.title)}</a></h3>
        <p>${esc(c.desc)}</p>
        <div class="badges">${lvBadge(c.level)}${langBadge(c)}<span class="badge ${c.cost === "free" ? "free" : c.cost === "paid" ? "paid" : ""}">${esc(costLabel(c.cost))}</span>${c.topics.map((x) => `<span class="badge">${D.topics[x].icon} ${esc(D.topics[x].label)}</span>`).join("")}</div>
      </div>
      <div class="course-foot">
        <a class="open" href="${c.url}" target="_blank" rel="noopener">${esc(t("card.open"))}</a>
        <button class="tgl save ${saved.has(c.id) ? "on" : ""}" data-act="save" aria-pressed="${saved.has(c.id)}" title="${esc(t("card.save"))}" aria-label="${esc(t("card.save"))}">★</button>
        <button class="tgl done ${done.has(c.id) ? "on" : ""}" data-act="done" aria-pressed="${done.has(c.id)}" title="${esc(t("card.doneTitle"))}">${esc(t("card.done"))}</button>
      </div></article>`;
  }
  function renderCourses() {
    const lvOrder = { beginner: 0, intermediate: 1, professional: 2 };
    const list = D.courses.filter(matches).sort((a, b) => lvOrder[a.level] - lvOrder[b.level] || (inLang(b) - inLang(a)));
    $("#resultCount").textContent = t("f.count", { n: list.length, total: D.courses.length });
    $("#courseGrid").innerHTML = list.length ? list.map(courseCard).join("") : `<div class="empty">${esc(t("f.empty"))} <button class="btn small ghost" data-reset>${esc(t("f.resetBtn"))}</button></div>`;
  }
  function toggle(id, act) {
    const set = act === "done" ? done : saved;
    set.has(id) ? set.delete(id) : set.add(id);
    persist(); renderCourses(); renderProgress(); renderRoadmap();
    if (provSel) renderProviderDetail();
    toast(act === "done" ? t(done.has(id) ? "toast.done" : "toast.undone") : t(saved.has(id) ? "toast.saved" : "toast.unsaved"));
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (b) { toggle(b.closest("[data-id]").dataset.id, b.dataset.act); return; }
    if (e.target.closest("[data-reset]")) { resetFilters(); renderFilters(); renderCourses(); }
  });
  $("#levelChips").addEventListener("click", (e) => { const b = e.target.closest("[data-level]"); if (b) { F.level = b.dataset.level; renderFilters(); renderCourses(); } });
  $("#topicChips").addEventListener("click", (e) => { const b = e.target.closest("[data-topic]"); if (b) { F.topic = b.dataset.topic; renderFilters(); renderCourses(); } });
  let qT; $("#search").addEventListener("input", (e) => { clearTimeout(qT); qT = setTimeout(() => { F.q = e.target.value.trim().toLowerCase(); renderCourses(); }, 120); });
  [["#providerSel", "provider"], ["#formatSel", "format"], ["#costSel", "cost"], ["#statusSel", "status"]].forEach(([s, k]) => $(s).addEventListener("change", (e) => { F[k] = e.target.value; renderCourses(); }));
  $("#resetFilters").addEventListener("click", () => { resetFilters(); renderFilters(); renderCourses(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); $("#search").focus(); $("#courses").scrollIntoView(); }
  });

  /* ---------------- providers ---------------- */
  let provSel = "";
  function renderProviders() {
    $("#providerGrid").innerHTML = Object.entries(D.providers).map(([k, p]) => {
      const n = D.courses.filter((c) => c.provider === k).length;
      return `<button class="prov-card ${provSel === k ? "on" : ""}" data-prov="${k}" style="--pc:${p.color}" aria-expanded="${provSel === k}">${monoBadge(k)}<span><b>${esc(p.name)}</b><small>${esc(t(n > 1 ? "prov.many" : "prov.one", { n }))}</small></span></button>`;
    }).join("");
  }
  function renderProviderDetail() {
    const box = $("#providerDetail");
    if (!provSel) { box.hidden = true; return; }
    const p = D.providers[provSel], list = D.courses.filter((c) => c.provider === provSel);
    box.hidden = false;
    box.innerHTML = `<div class="pd-head">${monoBadge(provSel)}<h3>${esc(p.name)}</h3><a class="btn small ghost" href="${p.site}" target="_blank" rel="noopener">${esc(t("prov.official"))}</a></div>
      <p style="color:var(--muted)">${esc(p.blurb)}</p>
      <div class="pd-cols">${LEVELS.map((lv) => {
        const items = list.filter((c) => c.level === lv);
        return `<div><h4>${D.levels[lv].icon} ${esc(D.levels[lv].label)} <span class="badge">${items.length}</span></h4><div class="mini-list">${items.length ? items.map((c) => `<a class="mini" href="${c.url}" target="_blank" rel="noopener"><span>${D.formats[c.format].icon}</span><span class="m-title">${esc(c.title)}</span>${langBadge(c)}${done.has(c.id) ? '<span class="badge free">✓</span>' : ""}</a>`).join("") : `<span class="fine">${esc(t("prov.none"))}</span>`}</div></div>`;
      }).join("")}</div>`;
  }
  $("#providerGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-prov]"); if (!b) return;
    provSel = provSel === b.dataset.prov ? "" : b.dataset.prov;
    renderProviders(); renderProviderDetail();
    if (provSel) $("#providerDetail").scrollIntoView({ block: "nearest" });
  });

  /* ---------------- local AI ---------------- */
  function renderLocal() {
    $("#reasonGrid").innerHTML = D.futureReasons.map((r) => `<div class="reason"><div class="ri">${r.icon}</div><h4>${esc(r.t)}</h4><p>${esc(r.d)}</p></div>`).join("");
    $("#hwTable").innerHTML = `<thead><tr>${["th.tier", "th.memory", "th.fit", "th.goodFor", "th.speed"].map((k) => `<th>${esc(t(k))}</th>`).join("")}</tr></thead><tbody>${D.hardwareTiers.map((h) => `<tr><td>${esc(h.tier)}</td><td>${esc(h.mem)}</td><td>${esc(h.models)}</td><td>${esc(h.use)}</td><td>${esc(h.speed)}</td></tr>`).join("")}</tbody>`;
    $("#modelTable").innerHTML = `<thead><tr>${["th.family", "th.org", "th.sizes", "th.strengths", "th.license"].map((k) => `<th>${esc(t(k))}</th>`).join("")}</tr></thead><tbody>${D.openModels.map((m) => `<tr><td><a href="${m.url}" target="_blank" rel="noopener">${esc(m.family)} ↗</a></td><td>${esc(m.org)}</td><td>${esc(m.sizes)}</td><td>${esc(m.strengths)}</td><td>${esc(m.license)}</td></tr>`).join("")}</tbody>`;
    $("#toolGrid").innerHTML = D.localTools.map((x) => `<a class="tool" href="${x.url}" target="_blank" rel="noopener"><b>${esc(x.name)} ↗</b><p>${esc(x.desc)}</p><div class="badges">${lvBadge(x.level)}<span class="badge">${esc(x.best)}</span></div></a>`).join("");
    renderDeploy();
  }
  let deployId = "ollama";
  const LEVEL_WORD = { Beginner: "beginner", Intermediate: "intermediate", Professional: "professional" };
  function renderDeploy() {
    $("#deployTabs").innerHTML = C.deploy.map((d) => `<button class="code-tab ${d.id === deployId ? "on" : ""}" role="tab" aria-selected="${d.id === deployId}" data-dep="${d.id}">${esc(d.label)}</button>`).join("");
    const d = C.deploy.find((x) => x.id === deployId);
    const lv = LEVEL_WORD[d.level] ? D.levels[LEVEL_WORD[d.level]].label : t("lvl.all");
    $("#deployPanel").innerHTML = `<p class="note"><span class="badge">${esc(lv)}</span> ${esc(d.note)}</p>${codeBlock(d.code, d.lang)}`;
  }
  $("#deployTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-dep]"); if (b) { deployId = b.dataset.dep; renderDeploy(); } });

  /* VRAM calculator */
  const DEVICE_CAP = [5, 11, 7.5, 11.5, 15.5, 23.5, 31.5, 48, 47, 96, 79, 630];
  const PRESETS = [["3B", 3], ["8B", 8], ["14B", 14], ["~20B MoE", 21], ["32B", 32], ["70B", 70], ["~120B MoE", 117], ["~670B MoE", 671]];
  function calc() {
    const P = Math.max(0.1, parseFloat($("#cParamsN").value) || 1);
    const bits = parseFloat($("#cQuant").value), ctx = +$("#cCtx").value, users = +$("#cUsers").value;
    const w = (P * bits) / 8;
    const kv = (ctx * users * 0.046 * Math.sqrt(P)) / 1024;
    const ov = 0.1 * (w + kv) + 0.5;
    const tot = w + kv + ov;
    const pc = (x) => ((x / tot) * 100).toFixed(1) + "%";
    const nf = new Intl.NumberFormat(I18N.lang, { maximumFractionDigits: 1 });
    $("#calcOut").innerHTML = `<div class="fine">${esc(t("calc.need"))}</div>
      <div class="big-num">${nf.format(tot < 10 ? tot : Math.round(tot))} <small>GB</small></div>
      <div class="stackbar" aria-hidden="true"><i style="width:${pc(w)};background:var(--accent)"></i><i style="width:${pc(kv)};background:var(--accent-2)"></i><i style="width:${pc(ov)};background:var(--accent-3)"></i></div>
      <div class="breakdown">
        <div><span>${esc(t("calc.weights", { p: nf.format(P), bits: nf.format(bits) }))}</span><b>${nf.format(w)} GB</b></div>
        <div><span>${esc(t("calc.kv", { ctx: ctx / 1024, users }))}</span><b>${nf.format(kv)} GB</b></div>
        <div><span>${esc(t("calc.overhead"))}</span><b>${nf.format(ov)} GB</b></div>
      </div>
      <div class="fits">${DEVICE_CAP.map((cap, i) => {
        const ok = tot <= cap, tight = !ok && w <= cap * 1.6 && cap < 100;
        return `<div class="fit"><span class="dot" style="background:${ok ? "var(--good)" : tight ? "var(--warn)" : "var(--bad)"}"></span>${esc(t("dev." + i))} <span class="fine">— ${esc(t(ok ? "calc.fits" : tight ? "calc.offload" : "calc.small"))}</span></div>`;
      }).join("")}</div>`;
  }
  function initCalc() {
    $("#cPresets").innerHTML = PRESETS.map(([l, v]) => `<button class="chip" type="button" data-p="${v}">${l}</button>`).join("");
    $("#cPresets").addEventListener("click", (e) => { const b = e.target.closest("[data-p]"); if (b) { $("#cParamsN").value = b.dataset.p; $("#cParams").value = Math.min(700, b.dataset.p); calc(); } });
    $("#cParams").addEventListener("input", (e) => { $("#cParamsN").value = e.target.value; calc(); });
    $("#cParamsN").addEventListener("input", (e) => { $("#cParams").value = Math.min(700, e.target.value || 1); calc(); });
    ["#cQuant", "#cCtx", "#cUsers"].forEach((s) => $(s).addEventListener("change", calc));
  }

  /* ---------------- AI harness stack ---------------- */
  let stackId = "agents";
  function renderStack() {
    const n = C.stack.length;
    $("#stackLayers").innerHTML = C.stack.map((l, i) => `<button class="layer ${l.id === stackId ? "on" : ""}" role="tab" aria-selected="${l.id === stackId}" data-layer="${l.id}" style="--lc:${l.color}">
      <span class="lnum">L${n - i}</span><span class="li" aria-hidden="true">${l.icon}</span><b>${esc(l.t)}</b><small>${l.concepts.slice(0, 3).map(esc).join(" · ")}</small></button>`).join("");
    const o = C.stackOps;
    $("#stackOps").innerHTML = `<button class="${stackId === o.id ? "on" : ""}" data-layer="${o.id}" style="--lc:${o.color}" aria-pressed="${stackId === o.id}">${o.icon} ${esc(o.t)}</button>`;
    const l = stackId === o.id ? o : C.stack.find((x) => x.id === stackId);
    const box = $("#stackDetail");
    box.style.setProperty("--lc", l.color);
    box.innerHTML = `<h3><span aria-hidden="true">${l.icon}</span> ${esc(l.t)}</h3><p style="color:var(--muted);margin:0">${esc(l.d)}</p>
      <div class="sd-cols">
        <div><h4>${esc(t("stack.concepts"))}</h4><div class="chip-row">${l.concepts.map((c) => `<span class="badge">${esc(c)}</span>`).join("")}</div></div>
        <div><h4>${esc(t("stack.tools"))}</h4><div class="tool-links">${l.tools.map(([name, url]) => `<a href="${url}" target="_blank" rel="noopener">${esc(name)} ↗</a>`).join("")}</div></div>
        <div><h4>${esc(t("stack.learn"))}</h4><div class="mini-list">${l.learn.map((id) => courseById[id]).filter(Boolean).map((c) => miniCourse(c, lvBadge(c.level))).join("")}</div></div>
      </div>`;
  }
  $("#harness").addEventListener("click", (e) => { const b = e.target.closest("[data-layer]"); if (b) { stackId = b.dataset.layer; renderStack(); } });

  /* ---------------- agent harness diagram ---------------- */
  function renderHarness() {
    const pills = [[0, "hd.p0", 110, 92], [1, "hd.p1", 290, 92], [3, "hd.p2", 76, 180], [4, "hd.p3", 324, 180], [5, "hd.p4", 110, 270], [7, "hd.p5", 290, 270]];
    const tx = (x, y, s, size = 12, w = 600, fill = "var(--text)") => `<text x="${x}" y="${y}" text-anchor="middle" style="fill:${fill};font-size:${size}px;font-weight:${w};font-family:inherit">${esc(s)}</text>`;
    $("#harnessDiagram").innerHTML = `<svg viewBox="0 0 400 330" role="img" aria-labelledby="hdT"><title id="hdT">${esc(t("hd.title"))}</title>
      <rect x="6" y="6" width="388" height="318" rx="20" style="fill:none;stroke:var(--border-strong);stroke-width:1.5;stroke-dasharray:6 5"/>
      ${tx(200, 28, t("hd.env"), 10, 700, "var(--muted)")}
      <rect x="24" y="44" width="352" height="268" rx="16" style="fill:color-mix(in srgb, var(--accent) 9%, transparent);stroke:var(--accent);stroke-width:1.2"/>
      ${tx(200, 64, t("hd.harness"), 11, 800, "var(--accent)")}
      <circle cx="200" cy="180" r="70" style="fill:none;stroke:var(--accent-2);stroke-width:2;stroke-dasharray:4 6"><animateTransform attributeName="transform" type="rotate" from="0 200 180" to="360 200 180" dur="24s" repeatCount="indefinite"/></circle>
      <path d="M262 150 l8 -6 l2 10 z" style="fill:var(--accent-2)"/>
      ${tx(200, 128, t("hd.loop"), 9.5, 600, "var(--accent-2)")}
      <circle cx="200" cy="184" r="40" style="fill:var(--surface-2);stroke:var(--border-strong)"/>
      ${tx(200, 182, "🧠", 22, 400)}${tx(200, 202, t("hd.model"), 12, 700)}
      ${pills.map(([i, key, x, y]) => {
        const label = t(key), side = x < 100 || x > 300;
        const w = Math.min(side ? 104 : 160, Math.max(92, [...label].length * 6 + 22));
        return `<g class="hd-pill" data-part="${i}" style="cursor:pointer"><rect x="${x - w / 2}" y="${y - 14}" width="${w}" height="26" rx="13" style="fill:var(--surface);stroke:var(--border-strong)"/>${tx(x, y + 4, label, side && [...label].length > 15 ? 9 : 10, 600)}</g>`;
      }).join("")}
      ${tx(200, 302, t("hd.foot"), 9.5, 600, "var(--muted)")}
    </svg>`;
    $("#harnessParts").innerHTML = C.harnessParts.map((p, i) => `<div class="hpart" data-part="${i}"><b>${p.icon} ${esc(p.t)}</b><p>${esc(p.d)}</p></div>`).join("");
    $("#harnessExamples").innerHTML = C.harnessExamples.map((h) => `<a class="tool" href="${h.url}" target="_blank" rel="noopener"><b>${esc(h.name)} ↗</b><p>${esc(h.desc)}</p><div class="badges"><span class="badge">${esc(h.best)}</span></div></a>`).join("");
    $("#harnessRules").innerHTML = C.harnessRules.map((r) => `<li>${r}</li>`).join("");
    const hl = (i, on) => $$(`.hpart[data-part="${i}"]`).forEach((el) => el.classList.toggle("hl", on));
    $$(".hd-pill").forEach((g) => {
      g.addEventListener("mouseenter", () => hl(g.dataset.part, true));
      g.addEventListener("mouseleave", () => hl(g.dataset.part, false));
      g.addEventListener("click", () => { const el = $(`.hpart[data-part="${g.dataset.part}"]`); el.scrollIntoView({ block: "nearest", behavior: "smooth" }); hl(g.dataset.part, true); setTimeout(() => hl(g.dataset.part, false), 1400); });
    });
  }

  /* ---------------- updates ---------------- */
  function renderUpdates() {
    $("#trendGrid").innerHTML = D.trends.map((x) => `<div class="trend"><div class="ri">${x.icon}</div><h4>${esc(x.t)}</h4><p>${esc(x.d)}</p></div>`).join("");
    $("#updateGrid").innerHTML = D.updates.map((g) => `<div class="update-col"><h4>${esc(g.cat)}</h4>${g.items.map((i) => `<a href="${i.u}" target="_blank" rel="noopener">${esc(i.n)} ↗<small>${esc(i.d)}</small></a>`).join("")}</div>`).join("");
  }

  /* =================== SMART QUIZ =================== */
  const Q = { mode: "adaptive", topic: "agents", fixedLevel: 1 };
  let S = null; // session
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const seen = new Set(store.get("seenQ", []));
  const LVN = { 1: "beginner", 2: "intermediate", 3: "professional" };
  const histLabel = (h) => {
    if (!h.m) return h.mode || ""; // entries saved before translations existed
    if (h.m === "topic") return t("q.h.topic", { x: (D.topics[h.x] || {}).label || h.x });
    if (h.m === "level") return t("q.h.level", { x: D.levels[LVN[h.x]].label });
    return t("q.h.adaptive");
  };

  function quizIntro() {
    const hist = store.get("quizHistory", []);
    const topicOpts = Object.entries(D.topics).filter(([k]) => BANK.some((q) => q.topic === k)).map(([k, tp]) => `<option value="${k}" ${Q.topic === k ? "selected" : ""}>${tp.icon} ${esc(tp.label)}</option>`).join("");
    const mode = (m) => `<button class="mode ${Q.mode === m ? "on" : ""}" data-mode="${m}"><b>${esc(t("q.m." + m))}</b><small>${esc(t("q.m." + m + "D"))}</small></button>`;
    $("#quizBox").innerHTML = `<div class="quiz-intro">
      <div class="mode-grid">${mode("adaptive")}${mode("topic")}${mode("level")}</div>
      <div class="filter-row">
        ${Q.mode === "topic" ? `<label>${esc(t("q.topic"))} <select id="qTopic">${topicOpts}</select></label>` : ""}
        ${Q.mode === "level" ? `<label>${esc(t("q.level"))} <select id="qLevel">${[1, 2, 3].map((l) => `<option value="${l}" ${Q.fixedLevel === l ? "selected" : ""}>${D.levels[LVN[l]].icon} ${esc(D.levels[LVN[l]].label)}</option>`).join("")}</select></label>` : ""}
      </div>
      <div><button class="btn primary" id="qStart">${esc(t("q.start"))}</button> <span class="fine">${t("q.keys")}</span></div>
      ${hist.length ? `<div class="history"><b>${esc(t("q.recent"))}</b><br>${hist.slice(0, 5).map((h) => `${new Date(h.d).toLocaleDateString(I18N.lang)} · ${esc(histLabel(h))} · ${h.score}% · ${D.levels[h.level].icon} ${esc(D.levels[h.level].label)}`).join("<br>")}</div>` : ""}
    </div>`;
  }
  $("#quizBox").addEventListener("click", (e) => {
    const m = e.target.closest("[data-mode]"); if (m) { Q.mode = m.dataset.mode; quizIntro(); return; }
    if (e.target.closest("#qStart")) { startQuiz(); return; }
    const o = e.target.closest("[data-opt]"); if (o && S && !S.answered) { answer(+o.dataset.opt); return; }
    if (e.target.closest("#qNext")) { nextQ(); return; }
    if (e.target.closest("#qQuit") || e.target.closest("#qRestart")) { S = null; quizIntro(); }
  });
  $("#quizBox").addEventListener("change", (e) => {
    if (e.target.id === "qTopic") Q.topic = e.target.value;
    if (e.target.id === "qLevel") Q.fixedLevel = +e.target.value;
  });

  function startQuiz() {
    const len = Q.mode === "topic" ? 8 : 10;
    S = { len, i: 0, level: Q.mode === "level" ? Q.fixedLevel : 1, streak: 0, asked: [], log: [], answered: false, cur: null, maxLevel: 1 };
    nextQ(true);
  }
  function pickQuestion() {
    const asked = new Set(S.asked);
    let pool = BANK.filter((q) => !asked.has(q.id));
    if (Q.mode === "topic") pool = pool.filter((q) => q.topic === Q.topic);
    if (!pool.length) return null;
    const topicCount = {}; S.log.forEach((l) => (topicCount[l.topic] = (topicCount[l.topic] || 0) + 1));
    const score = (q) => Math.abs(q.level - S.level) * 100 + (seen.has(q.id) ? 20 : 0) + (Q.mode === "adaptive" ? (topicCount[q.topic] || 0) * 15 : 0) + Math.random() * 10;
    return pool.slice().sort((a, b) => score(a) - score(b))[0];
  }
  function nextQ(first) {
    if (!first) S.i++;
    if (S.i >= S.len) return results();
    const q = pickQuestion();
    if (!q) return results();
    S.cur = { id: q.id, order: shuffle(q.o.map((_, i) => i)) };
    S.asked.push(q.id); S.answered = false;
    renderQ();
  }
  function renderQ() {
    const q = quizById[S.cur.id], tp = D.topics[q.topic];
    $("#quizBox").innerHTML = `
      <div class="quiz-top"><span>${esc(t("q.progress", { i: S.i + 1, n: S.len, topic: `${tp.icon} ${tp.label}` }))}</span>
        <span class="diff" title="${esc(t("q.difficulty"))}">${esc(t("q.difficulty"))}&nbsp;${[1, 2, 3].map((l) => `<i class="${l <= q.level ? "on" : ""}"></i>`).join("")}</span></div>
      <div class="qbar"><i style="width:${(S.i / S.len) * 100}%"></i></div>
      <div class="question">${esc(q.q)}</div>
      <div class="options">${S.cur.order.map((oi, k) => `<button class="opt" data-opt="${oi}"><span class="k">${k + 1}</span><span>${esc(q.o[oi])}</span></button>`).join("")}</div>
      <div id="qExplain"></div>
      <div class="quiz-actions"><button class="btn small ghost" id="qQuit">${esc(t("q.quit"))}</button><span class="fine">${esc(t("q.score", { a: S.log.filter((l) => l.ok).length, b: S.log.length }))}</span></div>`;
    if (S.answered) showAnswer();
  }
  function answer(oi) {
    const q = quizById[S.cur.id], ok = oi === q.a;
    S.answered = true; S.cur.picked = oi; seen.add(q.id); store.set("seenQ", [...seen].slice(-200));
    S.log.push({ id: q.id, topic: q.topic, level: q.level, ok });
    if (Q.mode !== "level") {
      if (ok) { S.streak++; if (S.streak >= 2 && S.level < 3) { S.level++; S.streak = 0; } }
      else { S.streak = 0; if (S.level > 1) S.level--; }
      S.maxLevel = Math.max(S.maxLevel, S.level);
    }
    S.cur.trend = Q.mode === "level" ? "" : ok && S.level > q.level ? "up" : !ok && S.level < q.level ? "down" : "";
    showAnswer();
    $("#qNext").focus({ preventScroll: true });
  }
  function showAnswer() { // also used to re-draw an answered question after a language switch
    const q = quizById[S.cur.id], oi = S.cur.picked, ok = oi === q.a;
    $$(".opt").forEach((b) => { b.disabled = true; const v = +b.dataset.opt; if (v === q.a) b.classList.add("correct"); else if (v === oi) b.classList.add("wrong"); });
    const trend = S.cur.trend ? " · " + t(S.cur.trend === "up" ? "q.up" : "q.down") : "";
    $("#qExplain").innerHTML = `<div class="explain"><b>${esc(t(ok ? "q.correct" : "q.wrong"))}</b>${esc(trend)}<br>${esc(q.e)}</div>`;
    $(".quiz-actions").innerHTML = `<button class="btn small ghost" id="qQuit">${esc(t("q.quit"))}</button><button class="btn primary" id="qNext">${esc(t(S.i + 1 >= S.len ? "q.results" : "q.next"))}</button>`;
  }
  document.addEventListener("keydown", (e) => {
    if (!S || !S.cur || !$("#quizBox .question")) return;
    if (/input|select|textarea/i.test(document.activeElement.tagName)) return;
    const r = $("#quizBox").getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    if (!S.answered && /^[1-4]$/.test(e.key)) { const b = $$(".opt")[+e.key - 1]; if (b) { e.preventDefault(); b.click(); } }
    else if (S.answered && e.key === "Enter" && $("#qNext")) { e.preventDefault(); $("#qNext").click(); }
  });

  function estimateLevel() {
    if (Q.mode === "level") { const acc = S.log.filter((l) => l.ok).length / S.log.length; return acc >= 0.7 ? Q.fixedLevel : Math.max(1, Q.fixedLevel - 1); }
    const accAt = (lv) => { const xs = S.log.filter((l) => l.level === lv); return xs.length ? { n: xs.length, acc: xs.filter((l) => l.ok).length / xs.length } : { n: 0, acc: 0 }; };
    const a3 = accAt(3), a2 = accAt(2);
    if (a3.n >= 2 && a3.acc >= 0.6) return 3;
    if ((a2.n >= 2 && a2.acc >= 0.6) || S.maxLevel === 3) return 2;
    return 1;
  }
  let lastResult = null; // kept so results can be re-drawn in another language
  function results() {
    const total = S.log.length, good = S.log.filter((l) => l.ok).length, pct = total ? Math.round((good / total) * 100) : 0;
    const lvN = estimateLevel();
    const hist = store.get("quizHistory", []);
    hist.unshift({ d: Date.now(), m: Q.mode, x: Q.mode === "topic" ? Q.topic : Q.mode === "level" ? Q.fixedLevel : null, score: pct, level: LVN[lvN] });
    store.set("quizHistory", hist.slice(0, 20));
    lastResult = { log: S.log.slice(), total, good, pct, lvN };
    S = null;
    renderResults();
  }
  function renderResults() {
    const { log, total, good, pct, lvN } = lastResult, lv = LVN[lvN];
    const byTopic = {};
    log.forEach((l) => { (byTopic[l.topic] = byTopic[l.topic] || { n: 0, ok: 0 }); byTopic[l.topic].n++; if (l.ok) byTopic[l.topic].ok++; });
    const weak = Object.entries(byTopic).filter(([, v]) => v.ok / v.n < 0.7).map(([k]) => k);
    const targetTopics = weak.length ? weak : Object.keys(byTopic);
    const targetLevel = weak.length ? lv : LVN[Math.min(3, lvN + 1)];
    let recs = D.courses.filter((c) => c.level === targetLevel && c.topics.some((x) => targetTopics.includes(x)) && !done.has(c.id));
    if (recs.length < 3) recs = recs.concat(D.courses.filter((c) => c.topics.some((x) => targetTopics.includes(x)) && !done.has(c.id) && !recs.includes(c)));
    recs = recs.sort((a, b) => inLang(b) - inLang(a)).slice(0, 6);
    const mistakes = log.filter((l) => !l.ok).map((l) => quizById[l.id]);
    $("#quizBox").innerHTML = `
      <div class="result-hero"><div class="ring" style="--p:${pct}"><span>${pct}%</span></div>
        <div><div class="fine">${esc(t("q.est"))}</div><h3 style="font-size:1.6rem;margin:2px 0 6px">${D.levels[lv].icon} ${esc(D.levels[lv].label)}</h3><p style="color:var(--muted);margin:0">${esc(t("q.summary", { good, total, msg: t("q.msg" + lvN) }))}</p></div></div>
      <h4>${esc(t("q.byTopic"))}</h4>
      <div class="topic-bars">${Object.entries(byTopic).map(([k, v]) => { const p = Math.round((v.ok / v.n) * 100); return `<div><div class="bar-label"><span>${D.topics[k].icon} ${esc(D.topics[k].label)}</span><span>${v.ok}/${v.n}</span></div><div class="bar"><i style="width:${p}%;background:${p >= 70 ? "var(--good)" : p >= 40 ? "var(--warn)" : "var(--bad)"}"></i></div></div>`; }).join("")}</div>
      <h4>${esc(t("q.recTitle"))} ${esc(weak.length ? t("q.recWeak", { topics: weak.map((w) => D.topics[w].label).join(", ") }) : t("q.recAced"))}</h4>
      <div class="mini-list">${recs.map((c) => miniCourse(c, lvBadge(c.level))).join("") || `<span class="fine">${esc(t("q.recNone"))}</span>`}</div>
      ${mistakes.length ? `<details style="margin-top:18px"><summary style="cursor:pointer;font-weight:600">${esc(t("q.mistakes", { n: mistakes.length }))}</summary><div class="mini-list">${mistakes.map((m) => `<div class="mini" style="display:block"><b>${esc(m.q)}</b><br><span style="color:var(--good)">✓ ${esc(m.o[m.a])}</span><br><span class="fine">${esc(m.e)}</span></div>`).join("")}</div></details>` : ""}
      <div class="quiz-actions"><button class="btn ghost" id="qRestart">${esc(t("q.again"))}</button><button class="btn primary" data-goto-level="${lv}">${esc(t("q.openRoad", { level: D.levels[lv].label }))}</button></div>`;
  }
  function renderQuiz() {
    if (S && S.cur) renderQ();
    else if (lastResult && $("#quizBox .result-hero")) renderResults();
    else quizIntro();
  }
  $("#quizBox").addEventListener("click", (e) => { if (e.target.closest("#qRestart")) lastResult = null; });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-goto-level]"); if (!b) return;
    roadLv = b.dataset.gotoLevel; renderRoadmap(); $("#roadmap").scrollIntoView();
  });

  /* ---------------- nav, theme, language, misc ---------------- */
  $("#themeBtn").addEventListener("click", () => {
    const r = document.documentElement, next = r.dataset.theme === "light" ? "dark" : "light";
    r.dataset.theme = next; try { localStorage.setItem("aih-theme", next); } catch (e) {}
  });
  $("#langSel").addEventListener("change", (e) => I18N.set(e.target.value));
  $("#menuBtn").addEventListener("click", () => { const open = $("#navLinks").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", open); });
  $("#navLinks").addEventListener("click", (e) => { if (e.target.closest("a")) { $("#navLinks").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false"); } });
  function setupObservers() {
    if (!("IntersectionObserver" in window)) return;
    const links = $$("#navLinks a");
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => io.observe(s));
    const rv = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); rv.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    $$(".section-head, .reason, .trend, .update-col, .rules li").forEach((el) => { el.classList.add("reveal"); rv.observe(el); });
  }
  $("#exportBtn").addEventListener("click", () => {
    const data = { exported: new Date().toISOString(), done: [...done].map((id) => courseById[id]?.title || id), saved: [...saved].map((id) => courseById[id]?.title || id), quizHistory: store.get("quizHistory", []) };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    a.download = "ai-engineer-hub-progress.json"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("#clearBtn").addEventListener("click", () => {
    if (!confirm(t("confirm.reset"))) return;
    done.clear(); saved.clear(); persist(); store.set("quizHistory", []); store.set("seenQ", []); seen.clear();
    renderCourses(); renderProgress(); renderRoadmap(); renderProviderDetail(); if (!S) quizIntro(); toast(t("toast.reset"));
  });

  /* ---------------- render everything (initial load + language switch) ---------------- */
  function renderAll() {
    localize();
    $("#langSel").value = I18N.lang;
    renderStats(); renderProgress(); renderRoadmap(); renderConcepts();
    initSelects(); renderFilters(); renderCourses();
    renderProviders(); renderProviderDetail(); renderLocal(); calc(); renderStack(); renderHarness(); renderQuiz(); renderUpdates();
  }
  initCalc();
  I18N.onChange(renderAll);
  I18N.start().then(setupObservers);
})();
