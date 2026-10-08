import type { Page } from "@/content/pages.server";

// Renders the original page markup 1:1; styling comes from /assets/site.css and behaviour from /assets/site.js.
export function OriginalPage({ page }: { page: Page }) {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: page.html }} />;
}

export function pageHead(page: Page | null | undefined) {
  if (!page) return { meta: [{ title: "Pagina nu există | AutoSoft" }, { name: "robots", content: "noindex" }] };
  return { meta: page.meta, links: page.links, scripts: page.scripts };
}
