import Image from "next/image";
import Link from "next/link";
import { CardContent, CardHeader } from "@/components/tutti";
import {
  SurfaceCard,
  SurfaceCardTitle,
  SurfaceCardDescription,
} from "@/components/site/surface-card";
import { caseStudies } from "@/lib/case-studies";

/**
 * The project card grid, shared by the home page's Side Projects section
 * and the /work page. auto-rows-fr keeps every card the same height
 * regardless of item count.
 */
export const WorkGrid = () => {
  return (
    <ul className="grid auto-rows-fr list-none gap-6 p-0 sm:grid-cols-2">
      {caseStudies.map((study) => (
        <li key={study.slug}>
          <Link
            href={`/work/${study.slug}`}
            className="group block h-full no-underline"
          >
            <SurfaceCard
              variant="elevated"
              className="h-full transition-shadow group-hover:shadow-lift"
            >
              <div className="px-6 pt-6">
                {study.previewImage ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-ink-subtle/30">
                    <Image
                      src={study.previewImage}
                      alt={`${study.title} screenshot`}
                      fill
                      sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : study.previewLogo ? (
                  <div
                    aria-hidden="true"
                    className="flex aspect-[16/10] items-center justify-center rounded-lg bg-chrome"
                  >
                    <Image
                      src={study.previewLogo}
                      alt=""
                      width={96}
                      height={96}
                      unoptimized
                      className="h-24 w-24 rounded-2xl"
                    />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex aspect-[16/10] items-center justify-center rounded-lg bg-chrome"
                  >
                    <span className="border-b-4 border-accent px-1 pb-1 text-lg font-bold tracking-wide text-chrome-ink">
                      {study.title}
                    </span>
                  </div>
                )}
              </div>
              <CardHeader>
                <SurfaceCardTitle className="text-xl">
                  <span className="sweep-underline pb-1">{study.title}</span>
                </SurfaceCardTitle>
                <SurfaceCardDescription>{study.tagline}</SurfaceCardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm leading-relaxed text-ink-muted">
                  {study.summary}
                </p>
                <p className="flex flex-wrap gap-2" aria-hidden="true">
                  {study.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-surface px-2 py-0.5 text-xs text-ink-muted dark:bg-chrome dark:text-chrome-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </p>
              </CardContent>
            </SurfaceCard>
          </Link>
        </li>
      ))}
    </ul>
  );
};
