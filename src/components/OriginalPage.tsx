import type { Page } from "@/content/pages.server";

// Renders the original page markup 1:1; styling comes from /assets/site.css and behaviour from /assets/site.js.
export function OriginalPage({ page }: { page: Page }) {
  return (
    <div style={{ display: "contents" }}>
      <div className="demo-bar">
        Site <b>demo</b> — conținut fictiv de prezentare · Demo Vulcanizare Auto
      </div>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
}

export function pageHead(page: Page | null | undefined) {
  if (!page) return { meta: [{ title: "Pagina nu există | Demo Vulcanizare Auto" }, { name: "robots", content: "noindex" }] };
  return { meta: page.meta, links: page.links, scripts: page.scripts };
}
