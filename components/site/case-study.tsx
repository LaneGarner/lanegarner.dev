import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  CardContent,
  CardHeader,
  Divider,
  VStack,
} from "@/components/tutti";
import type { CaseStudy } from "@/lib/case-studies";
import {
  SurfaceCard,
  SurfaceCardTitle,
} from "./surface-card";

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
            className="dark:text-ink-muted dark:hover:text-ink"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/work"
            className="dark:text-ink-muted dark:hover:text-ink"
          >
            Projects
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage className="dark:text-ink">
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

      <SurfaceCard variant="outline" className="mb-10">
        <CardHeader>
          <SurfaceCardTitle>At a glance</SurfaceCardTitle>
        </CardHeader>
        <CardContent>
          <VStack spacing="md" className="dark:text-ink-soft">
            <div>
              <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-ink-muted">
                Role
              </h2>
              <p>{study.role}</p>
            </div>
            <Divider className="dark:border-[#3a3a3a]" />
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
            <Divider className="dark:border-[#3a3a3a]" />
            <ul className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Links">
              {study.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-ink-soft underline decoration-accent-cool decoration-2 underline-offset-4 transition-colors hover:text-accent-quiet dark:text-ink"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </VStack>
        </CardContent>
      </SurfaceCard>

      <div className="case-study-body mb-10 space-y-10">{children}</div>

      <Divider className="mb-10 dark:border-[#3a3a3a]" />
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
      <div className="space-y-4 leading-relaxed text-ink-soft dark:text-ink-soft">
        {children}
      </div>
    </section>
  );
};
