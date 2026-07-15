import type { ReactNode } from "react";

/**
 * Dark footer: a chrome band with icon+label social links that glow yellow
 * on hover, and a black sub-bar with the copyright + "Built with…" line.
 */
export const SiteFooter = () => {
  return (
    <footer className="bg-chrome-deep text-chrome-ink">
      <div className="flex items-center justify-center gap-4 px-4 py-5 sm:gap-16">
        <FooterLink href="https://github.com/LaneGarner" label="GitHub">
          <GitHubIcon />
        </FooterLink>
        <FooterLink
          href="https://www.linkedin.com/in/lanegarner"
          label="LinkedIn"
        >
          <LinkedInIcon />
        </FooterLink>
      </div>
      <div className="bg-black px-4 pb-4 pt-2 text-center text-sm text-[#a4a4a4]">
        <span>© {new Date().getFullYear()} Lane Garner. </span>
        <span>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="text-chrome-ink underline decoration-accent-cool transition-colors hover:text-accent"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/LaneGarner/tutti-ui"
            target="_blank"
            rel="noreferrer"
            className="text-chrome-ink underline decoration-accent-cool transition-colors hover:text-accent"
          >
            tutti-ui
          </a>
          .
        </span>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
  children: ReactNode;
}

const FooterLink = ({ href, label, children }: FooterLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center gap-1 px-4 py-2 text-sm text-chrome-ink no-underline transition-colors hover:text-accent"
    >
      <span aria-hidden="true">{children}</span>
      {label}
    </a>
  );
};

const GitHubIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.05.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
};

const LinkedInIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
};

