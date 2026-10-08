import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav: [string, string][] = [
  ["/schimb-anvelope-constanta", "Schimb anvelope"],
  ["/vulcanizare-mobila-constanta", "Vulcanizare mobilă"],
  ["/anvelope-second-hand-constanta", "Anvelope second-hand"],
  ["/anvelope-noi-constanta", "Anvelope noi"],
  ["/indreptare-jante-constanta", "Îndreptare jante"],
  ["/echilibrare-roti-constanta", "Echilibrare roți"],
  ["/reparatie-pana-constanta", "Reparații pene"],
  ["/senzori-presiune-tpms-constanta", "Senzori TPMS"],
  ["/hotel-anvelope-constanta", "Hotel anvelope"],
  ["/geometrie-roti-constanta", "Geometrie roți"],
  ["/incarcare-freon-constanta", "Încărcare freon"],
  ["/intrebari-frecvente", "Întrebări frecvente"],
  ["/ghid", "Ghiduri"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/"><img src="https://autosoftconstanta.ro/assets/img/logo-alb.webp?v=f862e8a0" alt="AutoSoft" className="h-9" /></Link>
        <div className="flex items-center gap-2">
          <a href="tel:+40790842932" className="btn-primary !py-2">Sună</a>
          <a href="https://wa.me/40728595539?text=Salut!" className="btn-ghost !py-2">WhatsApp</a>
          <button onClick={() => setOpen(!open)} className="btn-ghost !py-2" aria-label="Meniu">☰</button>
        </div>
      </div>
      {open && (
        <nav className="mx-auto grid max-w-6xl gap-1 px-5 pb-4 sm:grid-cols-2 lg:grid-cols-4">
          {nav.map(([to, l]) => (
            <a key={to} href={to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-card hover:text-primary">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const extra: [string, string][] = [["/servicii", "Servicii"], ["/preturi", "Prețuri"], ["/galerie", "Galerie"], ["/cafea-gratis", "Cafea gratis"], ["/contact", "Contact"], ["/vulcanizare-aurel-vlaicu-215", "Aurel Vlaicu 215"], ["/vulcanizare-pod-ipmc-aurel-vlaicu-126", "Pod IPMC"], ["/confidentialitate", "Confidențialitate"]];
  return (
    <footer className="border-t border-border bg-card py-12 text-sm text-muted-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3">
        <div>
          <img src="https://autosoftconstanta.ro/assets/img/logo-alb.webp?v=f862e8a0" alt="AutoSoft" className="h-9" />
          <p className="mt-3">Vulcanizare în Constanța, fără programare. Zilnic de la 08:00.</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {nav.map(([to, l]) => <a key={to} href={to} className="hover:text-primary">{l}</a>)}
        </div>
        <div className="grid gap-2">
          {extra.map(([to, l]) => <a key={to} href={to} className="hover:text-primary">{l}</a>)}
          <a href="tel:+40790842932" className="text-primary">0790 842 932 · Aurel Vlaicu 215</a>
          <a href="tel:+40790842933" className="text-primary">0790 842 933 · Pod IPMC</a>
        </div>
      </div>
      <p className="mt-10 text-center">© {new Date().getFullYear()} AutoSoft Constanța</p>
    </footer>
  );
}
