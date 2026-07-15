# Writing a blog post

Adding a post is one step: drop a new `.md` file in this folder
(`content/blog/`). The filename becomes the URL slug, e.g.
`css-has-selector.md` → `/blog/css-has-selector`. The index at `/blog`
picks it up automatically and sorts newest-first. No code changes, no
registration, no rebuild config.

Start from [`_template.md`](./_template.md): copy it, rename it, write.
Files starting with `_` (like the template) and this README are excluded
from the build.

## Frontmatter format

```md
---
title: "Your post title"
date: "MM-DD-YYYY"
featuredImage: /blog/your-image.jpg
---

Post body in Markdown starts here.
```

| Field           | Required | Notes                                                                                                        |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `title`         | yes      | Shown on the index and post page, and used for `<title>`/OG metadata. Quotes recommended.                     |
| `date`          | yes      | `MM-DD-YYYY` (e.g. `07-15-2026`). Used for display ("July 15, 2026") and newest-first sorting.               |
| `featuredImage` | no       | Public path to a header image, e.g. `/blog/my-image.jpg`. Put the file in `public/blog/`. Omit for no image; the index and post page render fine without one. |

## Body

Standard Markdown, rendered with [marked](https://marked.js.org/):
headings (`##`, `###`), lists, links, images, inline code, and code
blocks all work. Styling lives in `.blog-post` rules in
`app/globals.css`.
