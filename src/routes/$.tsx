import { createFileRoute, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { pages } from "@/content/pages";

function meta(md: string) {
  const title = md.match(/^# (.+)$/m)?.[1]?.trim() ?? "AutoSoft Constanța";
  const desc =
    md.split("\n").map((l) => l.trim()).find((l) => l.length > 60 && !/^[#!\[*]/.test(l))?.slice(0, 160) ??
    "Vulcanizare AutoSoft în Constanța";
  return { title, desc };
}

export const Route = createFileRoute("/$")({
  loader: ({ params }) => {
    const slug = (params._splat ?? "").replace(/\/+$/, "");
    const md = pages[slug];
    if (!md) throw notFound();
    return { md, slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Pagină negăsită — AutoSoft" }, { name: "robots", content: "noindex" }] };
    const { title, desc } = meta(loaderData.md);
    const t = `${title} — AutoSoft`;
    return {
      meta: [
        { title: t },
        { name: "description", content: desc },
        { property: "og:title", content: t },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ContentPage,
});

function ContentPage() {
  const { md } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-4xl px-5 py-14">
      <article className="prose-site">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
      </article>
    </main>
  );
}
