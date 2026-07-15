import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/tutti";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = (): { slug: string }[] =>
  getBlogPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: `${post.title}: a blog post by Lane Garner.`,
    openGraph: post.featuredImage
      ? { images: [{ url: post.featuredImage }] }
      : undefined,
  };
};

/**
 * A single blog post: markdown from content/blog rendered statically at
 * build time via marked.
 */
const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="dark:text-ink-muted dark:hover:text-ink"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/blog"
            className="dark:text-ink-muted dark:hover:text-ink"
          >
            Blog
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage className="dark:text-ink">
            {post.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumbs>

      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-extrabold leading-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mb-6 text-sm text-ink-muted">
          <time dateTime={post.dateISO}>{post.dateFormatted}</time>
        </p>
        {post.featuredImage && (
          <Image
            src={post.featuredImage}
            alt=""
            width={1200}
            height={630}
            priority
            className="h-56 w-full rounded-card object-cover shadow-lift sm:h-80"
            sizes="(min-width: 768px) 720px, 100vw"
          />
        )}
      </header>

      <div
        className="blog-post mb-12"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <p>
        <Link
          href="/blog"
          className="font-semibold text-ink-soft underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent-quiet dark:text-ink"
        >
          ← All posts
        </Link>
      </p>
    </article>
  );
};

export default BlogPostPage;
