import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Divider,
  VStack,
  HStack,
} from "@/components/tutti";
import type { CaseStudy } from "@/lib/case-studies";

interface CaseStudyLayoutProps {
  study: CaseStudy;
  children: ReactNode;
}

/** Shared shell for /work/* case-study pages. */
export const CaseStudyLayout = ({ study, children }: CaseStudyLayoutProps) => {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/work"
          >
            Projects
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>
            {study.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumbs>

      <header className="mb-8">
        {study.logo ? (
          <Image
            src={study.logo}
            alt=""
            width={72}
            height={72}
            unoptimized
            className="mb-4 rounded-2xl"
          />
        ) : null}
        <h1 className="mb-3 text-4xl font-extrabold leading-tight sm:text-5xl">
          {study.title}
        </h1>
        <p className="text-xl font-light text-ink-soft">{study.tagline}</p>
      </header>

      <Card variant="outline" className="mb-10">
        <CardHeader>
          <CardTitle>At a glance</CardTitle>
        </CardHeader>
        <CardContent>
          <VStack spacing="md">
            <div>
              <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-ink-muted">
                Role
              </h2>
              <p>{study.role}</p>
            </div>
            <Divider />
            <div>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-muted">
                Stack
              </h2>
              <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                {study.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md bg-surface px-2 py-1 text-sm text-ink-soft dark:bg-chrome dark:text-chrome-ink"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <Divider />
            <HStack spacing="md" wrap={true}>
              {study.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-ink-soft underline decoration-accent-cool decoration-2 underline-offset-4 transition-colors hover:text-accent-quiet dark:text-ink"
                >
                  {link.label} ↗
                </a>
              ))}
            </HStack>
          </VStack>
        </CardContent>
      </Card>

      <div className="case-study-body mb-10 space-y-10">{children}</div>

      <Divider className="mb-10" />
      <p>
        <Link
          href="/work"
          className="font-semibold text-ink-soft underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent-quiet dark:text-ink"
        >
          ← All projects
        </Link>
      </p>
    </article>
  );
};

interface CaseSectionProps {
  title: string;
  children: ReactNode;
}

/** A titled prose section inside a case study. */
export const CaseSection = ({ title, children }: CaseSectionProps) => {
  return (
    <section aria-label={title}>
      <h2 className="mb-3 text-2xl font-extrabold">{title}</h2>
      <div className="space-y-4 leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
};
