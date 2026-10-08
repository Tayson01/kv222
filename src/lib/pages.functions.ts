import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getPage = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ path: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const { pages } = await import("@/content/pages.server");
    const key = data.path === "/" ? "/" : data.path.replace(/\/+$/, "");
    return pages[key] ?? null;
  });
