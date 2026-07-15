import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Lane Garner.",
};

/**
 * Blog index: a simple static list of the markdown posts in content/blog,
 * matching the site style.
 */
const BlogPage = () => {
  const posts = getBlogPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-10 text-center text-4xl font-extrabold sm:text-5xl">
        Blog
      </h1>

      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <Link
                href={`/blog/${post.slug}`}
                className="group block no-underline"
              >
                {post.featuredImage && (
                  <Image
                    src={post.featuredImage}
                    alt=""
                    width={1200}
                    height={630}
                    className="mb-4 h-48 w-full rounded-card object-cover shadow-lift sm:h-64"
                    sizes="(min-width: 768px) 720px, 100vw"
                  />
                )}
                <h2 className="mb-1 text-2xl font-extrabold text-ink group-hover:underline group-hover:decoration-accent group-hover:decoration-4 group-hover:underline-offset-4 sm:text-3xl">
                  {post.title}
                </h2>
                <p className="text-sm text-ink-muted">
                  <time dateTime={post.dateISO}>{post.dateFormatted}</time>
                </p>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
