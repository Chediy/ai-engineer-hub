/* Tiny i18n engine — no dependencies.
   - Language: ?lang= param > saved choice > browser language > English
   - Translation files: assets/i18n/<lang>/{ui,data,content,quiz}.js, loaded on demand
   - Missing strings fall back to English, never break the page.
   - Static HTML: <el data-i18n="key"> (innerHTML) and data-i18n-attr="attr=key;attr2=key2" */
(function () {
  const SUPPORTED = ["en", "fr", "de"];
  const NAMES = { en: "English", fr: "Français", de: "Deutsch" };
  const FILES = ["ui", "data", "content", "quiz"];
  const dicts = { en: {} };
  const loading = {};
  const listeners = [];
  const original = new WeakMap(); // element -> { html, attrs:{} } (English from the HTML)
  let lang = "en";

  function merge(a, b) {
    for (const k of Object.keys(b)) {
      const v = b[k];
      if (v && typeof v === "object" && !Array.isArray(v)) { a[k] = a[k] && typeof a[k] === "object" ? a[k] : {}; merge(a[k], v); }
      else a[k] = v;
    }
    return a;
  }
  function add(l, pack) { dicts[l] = merge(dicts[l] || {}, pack); }

  function load(l) {
    if (l === "en") return Promise.resolve();
    if (!loading[l]) {
      loading[l] = Promise.all(FILES.map((f) => new Promise((resolve) => {
        const s = document.createElement("script");
        s.src = `assets/i18n/${l}/${f}.js`;
        s.onload = resolve;
        s.onerror = () => { console.warn("[i18n] could not load", s.src); resolve(); };
        document.head.appendChild(s);
      })));
    }
    return loading[l];
  }

  function detect() {
    try { const p = new URLSearchParams(location.search).get("lang"); if (SUPPORTED.includes(p)) return p; } catch (e) {}
    try { const s = localStorage.getItem("aih-lang"); if (SUPPORTED.includes(s)) return s; } catch (e) {}
    const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (const n of prefs) { const c = String(n).slice(0, 2).toLowerCase(); if (SUPPORTED.includes(c)) return c; }
    return "en";
  }

  function t(key, vars) {
    const cur = (dicts[lang] && dicts[lang].ui) || {}, en = dicts.en.ui || {};
    let s = cur[key] != null ? cur[key] : en[key] != null ? en[key] : key;
    if (vars) s = String(s).replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    return s;
  }

  function applyStatic(root) {
    const ui = (dicts[lang] && dicts[lang].ui) || {};
    (root || document).querySelectorAll("[data-i18n], [data-i18n-attr]").forEach((el) => {
      let o = original.get(el);
      if (!o) { o = { html: el.innerHTML, attrs: {} }; original.set(el, o); }
      if (el.dataset.i18n) el.innerHTML = lang !== "en" && ui[el.dataset.i18n] != null ? ui[el.dataset.i18n] : o.html;
      if (el.dataset.i18nAttr) el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split("=").map((x) => x.trim()); if (!attr || !key) return;
        if (!(attr in o.attrs)) o.attrs[attr] = el.getAttribute(attr) || "";
        el.setAttribute(attr, lang !== "en" && ui[key] != null ? ui[key] : (dicts.en.ui || {})[key] || o.attrs[attr]);
      });
    });
  }

  function set(l, opts) {
    if (!SUPPORTED.includes(l)) l = "en";
    return load(l).then(() => {
      lang = l;
      document.documentElement.lang = l;
      try { localStorage.setItem("aih-lang", l); } catch (e) {}
      if (!opts || !opts.keepUrl) {
        try { const u = new URL(location.href); if (l === "en") u.searchParams.delete("lang"); else u.searchParams.set("lang", l); history.replaceState(null, "", u); } catch (e) {}
      }
      applyStatic();
      listeners.forEach((fn) => { try { fn(l); } catch (e) { console.error(e); } });
    });
  }

  window.I18N = {
    SUPPORTED, NAMES, add, t, set, applyStatic,
    get lang() { return lang; },
    pack: () => dicts[lang] || {},
    onChange: (fn) => listeners.push(fn),
    start: () => set(detect(), { keepUrl: true })
  };
})();
