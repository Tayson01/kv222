import { createFileRoute } from "@tanstack/react-router";
import { getPage } from "@/lib/pages.functions";
import { OriginalPage, pageHead } from "@/components/OriginalPage";

export const Route = createFileRoute("/")({
  loader: () => getPage({ data: { path: "/" } }),
  head: ({ loaderData }) => pageHead(loaderData),
  component: Home,
});

function Home() {
  const page = Route.useLoaderData();
  return page ? <OriginalPage page={page} /> : null;
}
