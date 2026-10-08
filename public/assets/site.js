/* Autosoft Constanța — site.js (fără dependențe) */
(function () {
  "use strict";
  var d = document, w = window;
  var TEL = "tel:+40777777777", WA = "https://wa.me/40777777777?text=";
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ---------- header solid la scroll ---------- */
  var hdr = $("#hdr");
  function onScroll() { if (hdr) hdr.classList.toggle("solid", w.scrollY > 8); }
  w.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- dialoguri: tot ce e în afară devine inert (focusul rămâne înăuntru) ---------- */
  function setInert(on, keep) {
    ["#hdr", "main", "footer", ".mbar", "#mnav", "#callpick"].forEach(function (sel) {
      var e = $(sel); if (!e || e === keep) return;
      if (on) e.setAttribute("inert", ""); else e.removeAttribute("inert");
    });
  }

  /* ---------- meniu mobil ---------- */
  var mnav = $("#mnav"), hamb = $(".hamb"), mx = $(".mnav-x");
  function setMenu(open) {
    if (!mnav) return;
    mnav.classList.toggle("open", open);
    d.body.classList.toggle("menu-open", open);
    hamb && hamb.setAttribute("aria-expanded", open ? "true" : "false");
    setInert(open, mnav);
    if (open) { var f = $("nav a", mnav); f && f.focus({ preventScroll: true }); } else { hamb && hamb.focus({ preventScroll: true }); }
  }
  hamb && hamb.addEventListener("click", function () { setMenu(true); });
  mx && mx.addEventListener("click", function () { setMenu(false); });
  mnav && $$("a", mnav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape" && mnav && mnav.classList.contains("open")) setMenu(false); });

  /* ---------- reveal: imediat în primul ecran + IO + failsafe 2.5s (iOS Safari) ---------- */
  var rv = $$(".rv");
  function show(el) { el.classList.add("in"); }
  rv.forEach(function (el) { if (el.getBoundingClientRect().top < w.innerHeight * 0.95) show(el); });
  if ("IntersectionObserver" in w) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    rv.forEach(function (el) { if (!el.classList.contains("in")) io.observe(el); });
  } else { rv.forEach(show); }
  setTimeout(function () { rv.forEach(show); }, 2500);

  /* ---------- tracking (doar dacă există gtag) ---------- */
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('[data-ev],a[href^="tel:"],a[href*="wa.me/"]');
    if (!a) return;
    /* „Sună”/„Traseu” care doar deschid alegerea locației nu sunt conversii: se numără apăsarea pe numărul/traseul ales */
    if (a.hasAttribute("data-callpick")) { if (typeof w.gtag === "function") w.gtag("event", "open_callpick", { loc: a.getAttribute("data-loc") || "" }); return; }
    var k = a.getAttribute("data-ev") || (/^tel:/.test(a.getAttribute("href") || "") ? "tel" : "wa");
    var ev = { tel: "click_tel", wa: "click_whatsapp", maps: "click_traseu", map: "load_map" }[k];
    if (!ev || typeof w.gtag !== "function") return;
    var href = a.getAttribute("href") || "", pid = href.match(/destination_place_id=([^&]+)/);
    w.gtag("event", ev, { loc: a.getAttribute("data-loc") || "inline", scenariu: a.getAttribute("data-s") || "",
      tel: /^tel:/.test(href) ? href.slice(4) : "", dest: pid ? pid[1] : "" });
    /* conversii Google Ads (contul clientului 503-757-5046), create ca secundare */
    var cv = { tel: "AW-765648821/VE2fCNTn-I0dELW_i-0C", wa: "AW-765648821/7_wbCOyZ8Y0dELW_i-0C", maps: "AW-765648821/lfV5COLg-Y0dELW_i-0C" }[k];
    if (cv) w.gtag("event", "conversion", { send_to: cv, value: 1.0, currency: "RON" });
  });

  /* ---------- hartă: se încarcă doar la click ---------- */
  $$(".map[data-map]").forEach(function (m) {
    var b = $(".load", m);
    b && b.addEventListener("click", function () {
      var f = d.createElement("iframe");
      f.src = m.getAttribute("data-map"); f.title = m.getAttribute("data-title") || "Harta: AutoSoft Constanța";
      f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade"; f.allowFullscreen = true;
      m.innerHTML = ""; m.appendChild(f);
      f.setAttribute("tabindex", "0"); f.focus({ preventScroll: true });
    });
  });

  /* ---------- consimțământ cookie-uri (Google Consent Mode v2) ---------- */
  var ck = $("#ck");
  function ckGet() { try { var o = JSON.parse(localStorage.getItem("as_consent") || "null"); return o && o.t > Date.now() - 31536e6 ? o.v : null; } catch (e) { return null; } }
  function ckSet(v) {
    try { localStorage.setItem("as_consent", JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
    var g = v === "yes" ? "granted" : "denied";
    if (typeof w.gtag === "function") w.gtag("consent", "update", { ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: g });
    if (ck) ck.hidden = true;
    d.body.classList.remove("ck-on");
  }
  if (ck) {
    if (!ckGet()) { ck.hidden = false; d.body.classList.add("ck-on"); }
    $$("[data-ck]", ck).forEach(function (b) { b.addEventListener("click", function () { ckSet(b.getAttribute("data-ck")); }); });
    $$("[data-ck-open]").forEach(function (b) { b.addEventListener("click", function () { ck.hidden = false; d.body.classList.add("ck-on"); var f = $("[data-ck=yes]", ck); f && f.focus(); }); });
  }

  /* ---------- program: „Deschis acum” / „Închis” după ora României ---------- */
  var LOCS = {}; try { LOCS = JSON.parse(($("#locs") || {}).textContent || "{}"); } catch (e) {}
  function roNow() {
    try {
      var p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Bucharest", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      var h = +p.filter(function (x) { return x.type === "hour"; })[0].value % 24, m = +p.filter(function (x) { return x.type === "minute"; })[0].value;
      return h * 60 + m;
    } catch (e) { var n = new Date(); return n.getHours() * 60 + n.getMinutes(); }
  }
  function mins(t) { var a = t.split(":"); return +a[0] * 60 + +a[1]; }
  function updStatus() {
    var now = roNow();
    $$("[data-open]").forEach(function (el) {
      var L = LOCS[el.getAttribute("data-open")]; if (!L) return;
      var o = mins(L.o), c = mins(L.c), open = now >= o && now < c;
      var t = $(".st-t", el), dot = $(".live", el), pre = el.getAttribute("data-pre");
      if (pre === null) { pre = /·/.test(t.textContent) ? t.textContent.split("·")[0].trim() + " · " : ""; el.setAttribute("data-pre", pre); }
      t.textContent = pre + (open ? "Deschis acum · până la " + L.c : (now < o ? "Închis · deschidem la " + L.o : "Închis · deschidem mâine la " + L.o));
      dot && dot.classList.toggle("off", !open);
      el.classList.toggle("closed", !open);
    });
    var hand = $("#clockHand"); if (hand) hand.style.transform = "rotate(" + (now / 4) + "deg)";
  }
  updStatus(); setInterval(updStatus, 60000);

  /* ---------- „Sună” / „Traseu” → alegi locația ---------- */
  var cp = $("#callpick"), cpFrom = null;
  function cpOpen(from) { if (!cp) return; cpFrom = from; cp.hidden = false; setInert(true, cp); var b = $(".cp-loc .btn", cp); b && b.focus(); }
  function cpClose() { if (!cp || cp.hidden) return; cp.hidden = true; setInert(false); cpFrom && cpFrom.focus({ preventScroll: true }); }
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-callpick]");
    if (!a || !cp) return;
    e.preventDefault();
    if (mnav && mnav.classList.contains("open")) setMenu(false);
    cpOpen(a);
  });
  cp && cp.addEventListener("click", function (e) { if (e.target === cp || e.target.closest(".cp-x")) cpClose(); });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape") cpClose(); });

  /* ---------- picker „Ce ai pățit?” ---------- */
  var S = {
    pana: { t: "Am făcut pană", intro: "Salut! Am făcut pană.",
      q: [{ k: "loc", l: "Unde ești?", o: ["Pot veni la atelier", "Sunt pe drum, în Constanța", "Sunt în afara orașului / pe A2"] },
          { k: "aer", l: "Roata mai ține aerul?", o: ["Da, pierde încet", "Nu, e complet dezumflată", "Nu știu"] }],
      f: { k: "car", l: "Mașina (opțional)", p: "ex. Dacia Logan 2019" },
      note: "Dacă roata e complet dezumflată, nu mai merge pe ea. Sună și venim noi." },
    drum: { t: "Sunt blocat pe drum", intro: "Salut! Am nevoie de vulcanizare mobilă, sunt blocat pe drum.", urgent: true,
      q: [{ k: "ce", l: "Ce s-a întâmplat?", o: ["Pană", "Anvelopă tăiată / explodată", "Jantă lovită", "Altceva"] },
          { k: "rez", l: "Ai roată de rezervă?", o: ["Da", "Nu", "Nu știu"] }],
      f: { k: "unde", l: "Unde ești? (adresă sau reper)", p: "ex. A2, km 210, sens spre Constanța" },
      note: "Pune avariile și triunghiul, iar pe autostradă stai în spatele parapetului. Cel mai rapid: sună, apoi trimite-ne locația pe WhatsApp." },
    sezon: { t: "Schimb pe iarnă / vară", intro: "Salut! Vreau să schimb anvelopele.",
      q: [{ k: "spre", l: "Treci pe…", o: ["iarnă", "vară"] },
          { k: "jante", l: "Ce ai?", o: ["Set complet pe jante", "Doar anvelopele", "Le am la hotel la voi"] },
          { k: "r", l: "Diametru jantă", o: ["R13–R15", "R16–R17", "R18+", "Nu știu"] }],
      f: { k: "car", l: "Mașina (opțional)", p: "ex. VW Golf 7" },
      note: "Nu e nevoie de programare. În sezon poate fi coadă, așa că sună înainte dacă vrei să știi cât ai de așteptat." },
    janta: { t: "Jantă îndoită sau fisurată", intro: "Salut! Am o problemă cu o jantă.",
      q: [{ k: "tip", l: "Ce are janta?", o: ["E îndoită", "E fisurată", "E zgâriată, vreau recondiționare"] },
          { k: "r", l: "Diametru", o: ["R15–R16", "R17–R18", "R19+", "Nu știu"] }],
      f: { k: "car", l: "Mașina (opțional)", p: "ex. BMW Seria 3" },
      note: "Dacă poți, atașează în WhatsApp o poză cu zona îndoită sau fisurată. Îți spunem din prima dacă se repară." },
    anvelope: { t: "Vreau anvelope", intro: "Salut! Caut anvelope.",
      q: [{ k: "tip", l: "Ce cauți?", o: ["Second-hand", "Noi", "Oricare, după preț"] },
          { k: "sez", l: "Sezon", o: ["Iarnă", "Vară", "All season"] },
          { k: "buc", l: "Câte?", o: ["1", "2", "4"] }],
      f: { k: "dim", l: "Dimensiunea (de pe flanc)", p: "ex. 205/55 R16" },
      note: "Nu știi dimensiunea? E scrisă pe flancul anvelopei. Mai jos pe pagină îți arătăm unde." },
    tpms: { t: "Martor de presiune aprins", intro: "Salut! Mi s-a aprins martorul de presiune a roților (TPMS).",
      q: [{ k: "cand", l: "Când s-a aprins?", o: ["După schimbul de anvelope", "Din senin", "Clipește, apoi rămâne aprins"] },
          { k: "pres", l: "Ai verificat presiunea?", o: ["Da, e bună", "Nu încă"] }],
      f: { k: "car", l: "Mașina și anul", p: "ex. Renault Megane 2018" },
      note: "Verifică întâi presiunea. Dacă e bună, problema e la senzor și poți veni până la noi." }
  };
  var LBL = { loc: "Locație", aer: "Aer", ce: "Problema", rez: "Roată de rezervă", spre: "Trec pe", jante: "Am", r: "Diametru",
    tip: "Tip", sez: "Sezon", buc: "Bucăți", cand: "S-a aprins", pres: "Presiune", car: "Mașina", unde: "Sunt la", dim: "Dimensiunea" };

  var panel = $("#pkp"), picks = $$(".pk");
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function render(key) {
    var sc = S[key]; if (!sc || !panel) return;
    var st = {};
    var h = '<h3>' + esc(sc.t) + '</h3>';
    sc.q.forEach(function (q) {
      h += '<div class="pk-q"><span>' + esc(q.l) + '</span><div class="opts" role="group" aria-label="' + esc(q.l) + '">';
      q.o.forEach(function (o) { h += '<button class="opt" type="button" aria-pressed="false" data-k="' + q.k + '" data-v="' + esc(o) + '">' + esc(o) + '</button>'; });
      h += '</div></div>';
    });
    if (sc.f) h += '<div class="pk-q"><span><label for="pkf">' + esc(sc.f.l) + '</label></span><input class="field" id="pkf" type="text" autocomplete="off" maxlength="80" placeholder="' + esc(sc.f.p) + '"></div>';
    h += '<div class="bubble-wrap"><span>Mesajul tău pe WhatsApp</span><div class="bubble" id="pkb"></div></div>';
    var callFirst = sc.urgent;
    var bCall = '<a class="btn btn-call" href="' + TEL + '" data-ev="tel" data-loc="picker" data-s="' + key + '">Sună acum</a>';
    var bWa = '<a class="btn btn-wa" id="pkwa" href="#" target="_blank" rel="noopener" data-ev="wa" data-loc="picker" data-s="' + key + '">Trimite pe WhatsApp</a>';
    h += '<div class="btns">' + (callFirst ? bCall + bWa : bWa + bCall) + '</div>';
    if (sc.note) h += '<p class="pk-note">' + esc(sc.note) + '</p>';
    panel.innerHTML = h;
    var bub = $("#pkb", panel), wa = $("#pkwa", panel), inp = $("#pkf", panel);
    function upd() {
      var lines = [sc.intro];
      sc.q.forEach(function (q) { if (st[q.k]) lines.push(LBL[q.k] + ": " + st[q.k]); });
      if (inp && inp.value.trim()) lines.push(LBL[sc.f.k] + ": " + inp.value.trim());
      var txt = lines.join("\n");
      bub.textContent = txt;
      wa.href = WA + encodeURIComponent(txt);
    }
    $$(".opt", panel).forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-k");
        $$('.opt[data-k="' + k + '"]', panel).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        st[k] = b.getAttribute("data-v"); upd();
      });
    });
    inp && inp.addEventListener("input", upd);
    upd();
  }
  picks.forEach(function (p) {
    p.addEventListener("click", function () {
      picks.forEach(function (x) { x.setAttribute("aria-pressed", x === p ? "true" : "false"); });
      render(p.getAttribute("data-s"));
      if (w.innerWidth < 980 && panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------- flanc interactiv ---------- */
  var SW = {
    w: ["205 = lățimea", "Lățimea anvelopei, în milimetri, de la un flanc la celălalt."],
    h: ["55 = înălțimea flancului", "Înălțimea flancului ca procent din lățime: 55% din 205 mm ≈ 113 mm. Cu cât e mai mică, cu atât anvelopa e mai „sport”."],
    r: ["R = radială", "Tipul de construcție. Practic toate anvelopele de autoturism de azi sunt radiale."],
    d: ["16 = diametrul jantei", "Diametrul jantei pe care se montează, în țoli. După el se stabilește de obicei și prețul la schimb."],
    l: ["91 = indicele de sarcină", "Cât poate duce o roată: 91 înseamnă 615 kg. Trebuie să fie cel puțin cât scrie în actele mașinii."],
    v: ["V = indicele de viteză", "Viteza maximă pentru care e făcută anvelopa: V = 240 km/h (T = 190, H = 210, W = 270)."],
    dot: ["DOT … 3421 = data fabricației", "Ultimele patru cifre: săptămâna 34 din anul 2021. Așa afli câți ani are o anvelopă, mai ales la second-hand."],
    ms: ["M+S = iarnă / all season", "Mud + Snow. Marcajul anvelopelor de iarnă și all season. Simbolul cu fulg de nea pe munte (3PMSF) înseamnă testată pe zăpadă."]
  };
  var tip = $("#swtip");
  function swSel(k) {
    if (!tip || !SW[k]) return;
    tip.innerHTML = "<b>" + esc(SW[k][0]) + "</b><span>" + esc(SW[k][1]) + "</span>";
    $$(".sidewall tspan[data-k]").forEach(function (t) { t.classList.toggle("on", t.getAttribute("data-k") === k); });
    $$(".sw-keys button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-k") === k ? "true" : "false"); });
  }
  $$(".sidewall tspan[data-k]").forEach(function (t) { t.addEventListener("click", function () { swSel(t.getAttribute("data-k")); }); });
  $$(".sw-keys button").forEach(function (b) { b.addEventListener("click", function () { swSel(b.getAttribute("data-k")); }); });

  /* ---------- dimensiune → WhatsApp ---------- */
  var ts = $("#tsize"), send = $("#sizeSend");
  if (ts && send) {
    var sel = {};
    var box = ts.closest(".size-box");
    function updSize() {
      var dim = ts.value.trim();
      var parts = ["Salut! Caut anvelope" + (sel.tip ? " " + sel.tip : "") + (sel.sezon ? " " + sel.sezon : "") + "."];
      parts.push("Dimensiunea: " + (dim || "…"));
      if (sel.buc) parts.push("Câte: " + sel.buc);
      send.href = WA + encodeURIComponent(parts.join("\n"));
    }
    $$(".opts[data-g]", box).forEach(function (g) {
      var k = g.getAttribute("data-g");
      $$(".opt", g).forEach(function (b) {
        b.addEventListener("click", function () {
          $$(".opt", g).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
          sel[k] = b.getAttribute("data-v"); updSize();
        });
      });
    });
    ts.addEventListener("input", updSize); updSize();
  }

  /* ---------- galerie + lightbox ---------- */
  var lb = $("#lb");
  if (lb) {
    var items = $$(".gal button"), li = 0, lim = $(".demo-art", lb);
    function open(i) { li = (i + items.length) % items.length; lim.setAttribute("aria-label", "Animație DEMO " + (li + 1) + " din " + items.length); lb.classList.add("open"); d.body.classList.add("menu-open"); if (lb.parentNode !== d.body) d.body.appendChild(lb); setInert(true, lb); $(".x", lb).focus(); }
    function close() { lb.classList.remove("open"); d.body.classList.remove("menu-open"); setInert(false); items[li] && items[li].focus(); }
    items.forEach(function (b, i) { b.addEventListener("click", function () { open(i); }); });
    $(".x", lb).addEventListener("click", close);
    $(".p", lb).addEventListener("click", function () { open(li - 1); });
    $(".n", lb).addEventListener("click", function () { open(li + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    d.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") open(li - 1); else if (e.key === "ArrowRight") open(li + 1);
    });
  }
})();
