import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPage } from "@/lib/pages.functions";
import { OriginalPage, pageHead } from "@/components/OriginalPage";

export const Route = createFileRoute("/$")({
  loader: async ({ params }) => {
    const page = await getPage({ data: { path: "/" + (params._splat ?? "") } });
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => pageHead(loaderData),
  component: Content,
});

function Content() {
  const page = Route.useLoaderData();
  return <OriginalPage page={page} />;
}
