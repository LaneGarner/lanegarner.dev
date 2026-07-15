import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  /** Raw frontmatter date, MM-DD-YYYY */
  date: string;
  /** e.g. "January 3, 2022" */
  dateFormatted: string;
  /** ISO yyyy-mm-dd for <time dateTime> and sorting */
  dateISO: string;
  /** Public path of the featured image */
  featuredImage?: string;
  /** Rendered HTML body */
  html: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ParsedFrontmatter {
  data: Record<string, string>;
  body: string;
}

/** Parse the simple `key: value` frontmatter the posts use. */
const parseFrontmatter = (raw: string): ParsedFrontmatter => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (key) data[key] = value;
  }
  return { data, body: raw.slice(match[0].length) };
};

interface FormattedDate {
  pretty: string;
  iso: string;
}

const formatDate = (mmddyyyy: string): FormattedDate => {
  const [mm, dd, yyyy] = mmddyyyy.split("-").map((s) => parseInt(s, 10));
  if (!mm || !dd || !yyyy) return { pretty: mmddyyyy, iso: mmddyyyy };
  return {
    pretty: `${MONTHS[mm - 1]} ${dd}, ${yyyy}`,
    iso: `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`,
  };
};

/**
 * All posts, newest first. Read at build time (static rendering).
 * Files starting with `_` (e.g. content/blog/_template.md) and the
 * authoring README are excluded from the build.
 */
export const getBlogPosts = (): BlogPost[] => {
  return fs
    .readdirSync(BLOG_DIR)
    .filter(
      (f) =>
        f.endsWith(".md") &&
        !f.startsWith("_") &&
        f.toLowerCase() !== "readme.md"
    )
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      const { pretty, iso } = formatDate(data.date ?? "");
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        dateFormatted: pretty,
        dateISO: iso,
        featuredImage: data.featuredImage || undefined,
        html: marked.parse(body, { async: false }),
      };
    })
    .sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
};

export const getBlogPost = (slug: string): BlogPost | undefined =>
  getBlogPosts().find((p) => p.slug === slug);
