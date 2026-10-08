import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const IMG = "https://autosoftconstanta.ro/assets/img/";
const TEL = "tel:+40790842932";
const WA = "https://wa.me/40728595539?text=";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoSoft — Vulcanizare în Constanța, fără programare" },
      { name: "description", content: "Două locații pe Bd. Aurel Vlaicu. Schimb anvelope, jante, senzori, pene și vulcanizare mobilă. Cafeaua e din partea casei." },
      { property: "og:title", content: "AutoSoft — Vulcanizare în Constanța" },
      { property: "og:description", content: "Schimb anvelope, vulcanizare mobilă, jante și TPMS. Deschis zilnic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: IMG + "hero-garaj-1200-0a621593.webp" },
      { name: "twitter:image", content: IMG + "hero-garaj-1200-0a621593.webp" },
    ],
  }),
  component: Index,
});

const situations: [string, string][] = [
  ["Am făcut pană", "Cui, șurub, roata pierde aer"],
  ["Sunt blocat pe drum", "Venim noi la tine"],
  ["Schimb pe iarnă", "Sau pe vară. Fără programare"],
  ["Jantă îndoită", "După o groapă sau bordură"],
  ["Vreau anvelope", "Second-hand sau noi"],
  ["Martor de presiune", "Aprins în bord și nu se stinge"],
];

const steps: [string, string][] = [
  ["Vii la una dintre locații", "Aurel Vlaicu 215, în curtea BWASH, sau Aurel Vlaicu 126, la Podul IPMC. Nu e nevoie de programare."],
  ["Bei o cafea din partea casei", "La Aurel Vlaicu 215 o comanzi la geam și aștepți în zona de relaxare, cu Wi-Fi și umbră."],
  ["Noi ne ocupăm de roți", "Montaj, echilibrare, verificăm uzura și presiunea. Dacă vedem ceva în neregulă, îți spunem."],
  ["Pleci cu un voucher", "La fiecare schimb de anvelope primești un voucher de 25, 50 sau 75 de lei pentru data viitoare."],
];

const services: [string, string, string?][] = [
  ["Schimb anvelope", "Vară pe iarnă și invers. Montaj, echilibrare și verificarea presiunii, fără programare.", "hala-800-e6749cd1.webp"],
  ["Vulcanizare mobilă", "Ai făcut pană și nu mai poți merge? Suni, ne spui unde ești și venim la tine."],
  ["Îndreptare și sudură jante", "Jantă îndoită de la o groapă sau fisurată? O îndreptăm, o sudăm sau o recondiționăm."],
  ["Echilibrare roți", "Scăpăm de vibrațiile din volan și de uzura inegală a anvelopelor."],
  ["Reparații pene", "Cui, șurub sau pierdere lentă de aer. Reparăm pe loc și umflăm cu azot, dacă vrei."],
  ["Anvelope second-hand", "AutoSoft Rulate: ne spui dimensiunea, îți zicem ce avem pe stoc și ți le montăm pe loc.", "rulate-1024-7d69f81f.webp"],
  ["Hotel anvelope", "Îți păstrăm anvelopele de la un sezon la altul, ferite de umezeală.", "depozit-anvelope-1024-28d53d49.webp"],
  ["Senzori TPMS", "Martorul de presiune aprins? Diagnosticăm, înlocuim și programăm senzorii."],
  ["Geometrie roți", "Mașina trage într-o parte? Reglăm unghiurile roților pentru o direcție dreaptă."],
];

const locations: [string, string, string, string, string, string][] = [
  ["AutoSoft Aurel Vlaicu 215", "Bd. Aurel Vlaicu 215 · în curtea spălătoriei BWASH, lângă METRO", "până la 22:00", "0790 842 932", "+40790842932", "Bulevardul Aurel Vlaicu 215, Constanța"],
  ["AutoSoft Pod IPMC", "Bd. Aurel Vlaicu 126 · vizavi de fabrica de pâine Dobrogea", "până la 20:00", "0790 842 933", "+40790842933", "Bulevardul Aurel Vlaicu 126, Constanța"],
];

function Btns() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={TEL} className="btn-primary">Sună acum</a>
      <a href={WA + "Salut!"} className="btn-ghost">WhatsApp</a>
    </div>
  );
}

function Index() {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-background text-foreground">

      <section className="relative overflow-hidden">
        <img src={IMG + "hero-garaj-1200-0a621593.webp"} alt="Atelier AutoSoft" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
          <span className="chip">● Aurel Vlaicu 215 · Deschis acum · până la 22:00</span>
          <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] md:text-7xl">Vulcanizare în Constanța, <span className="text-primary">fără programare</span></h1>
          <p className="mt-6 text-2xl">Noi avem grijă de mașina ta. Tu bei o cafea.</p>
          <p className="mt-4 max-w-xl text-muted-foreground">Două locații pe Bulevardul Aurel Vlaicu, deschise zilnic. Schimb anvelope, jante, senzori, pene și vulcanizare mobilă. Iar cât lucrăm, cafeaua e din partea casei.</p>
          <div className="mt-8"><Btns /></div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span><b className="text-primary">389</b> de recenzii pe Google</span>
            <span>Zilnic de la 08:00</span>
            <span>Voucher la fiecare schimb</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Spune-ne ce s-a întâmplat</p>
        <h2 className="font-display mt-2 text-4xl md:text-5xl">Ce ai pățit?</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">Alege situația și îți pregătim mesajul de WhatsApp. Tu doar apeși „Trimite”. Dacă e urgent, sună.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map(([t, d], i) => (
            <button key={t} onClick={() => setSel(i)} className={`card text-left transition ${sel === i ? "border-primary" : ""}`}>
              <b className="text-lg">{t}</b>
              <p className="text-sm text-muted-foreground">{d}</p>
            </button>
          ))}
        </div>
        <div className="card mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p>{sel === null ? "Alege din listă ce ai pățit." : `Mesaj: „Salut! ${situations[sel]![0]}. ${situations[sel]![1]}.”`}</p>
          <div className="flex gap-3">
            <a href={TEL} className="btn-ghost">Sună</a>
            <a href={WA + encodeURIComponent(sel === null ? "Salut!" : `Salut! ${situations[sel]![0]}. ${situations[sel]![1]}.`)} className="btn-primary">Trimite pe WhatsApp</a>
          </div>
        </div>
      </section>

      <section id="pasi" className="bg-card py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
          <figure>
            <img src={IMG + "lounge-215-1024-8bebc437.webp"} alt="Zona de relaxare AutoSoft" className="rounded-2xl" loading="lazy" />
            <figcaption className="mt-2 text-sm text-muted-foreground">Vederea din zona de relaxare</figcaption>
          </figure>
          <div>
            <p className="eyebrow">Pit-stop AutoSoft</p>
            <h2 className="font-display mt-2 text-4xl">Patru pași. Unul e cafeaua, altul e voucherul.</h2>
            <ol className="mt-8 space-y-6">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-display text-3xl text-primary">0{i + 1}</span>
                  <div><h3 className="text-lg font-semibold">{t}</h3><p className="text-muted-foreground">{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="servicii" className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Servicii</p>
        <h2 className="font-display mt-2 text-4xl md:text-5xl">Tot ce ține de roți, într-un singur loc.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([t, d, img]) => (
            <article key={t} className="card overflow-hidden !p-0">
              {img && <img src={IMG + img} alt={t} className="h-44 w-full object-cover" loading="lazy" />}
              <div className="p-5">
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                <p className="mt-4 text-sm text-primary">preț la telefon →</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="locatii" className="bg-card py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">Locații</p>
          <h2 className="font-display mt-2 text-4xl">Două ateliere pe Aurel Vlaicu.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {locations.map(([n, a, h, p, tel, q]) => (
              <div key={n} className="card bg-background">
                <h3 className="text-xl font-semibold">{n}</h3>
                <p className="mt-1 text-muted-foreground">{a}</p>
                <p className="mt-3 text-sm text-primary">Deschis zilnic · {h}</p>
                <div className="mt-5 flex gap-3">
                  <a href={"tel:" + tel} className="btn-primary">{p}</a>
                  <a href={"https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(q)} target="_blank" rel="noreferrer" className="btn-ghost">Traseu</a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Vulcanizarea mobilă: sună la Aurel Vlaicu 215.</p>
        </div>
      </section>

    </div>
  );
}
