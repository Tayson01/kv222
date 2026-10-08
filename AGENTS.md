<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Pages render the original autosoftconstanta.ro markup from `src/content/pages.server.ts` (served via a server function) with original `/public/assets/site.css` + `site.js`; edit content there, not in Tailwind components — keeps the clone 1:1 with the source.
- Demo media uses shared inline vector markup styled and animated in site.css; gallery navigation reuses that markup instead of loading source photographs, keeping replacements transparent and consistent.
