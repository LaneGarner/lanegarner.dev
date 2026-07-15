"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, useTheme } from "@tutti-ui/shared";
import { Logo } from "./logo";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Masthead + sticky nav: the laptop logo (with a skewed yellow highlight
 * bar sweeping in behind it) above a centered two-line title, then the nav.
 *
 * At sm and up the nav is the original centered row of grey mono links
 * (idle #999, hover #666, active dark). Below sm the row would wrap into
 * two cramped lines, so it collapses into a hamburger disclosure: a 44px
 * button that opens a dropdown panel with the same links stacked at full
 * tap-target height. The panel closes on link click, Escape, and outside
 * click; focus moves to the first link on open and back to the button when
 * closed from the keyboard.
 *
 * Clicking the logo toggles dark mode, with a moon cursor in light mode and
 * a sun cursor in dark mode (.logo-toggle in globals.css). The logo is a
 * real button (aria-label + focus ring) so keyboard and screen-reader users
 * get the same toggle.
 */
export const SiteHeader = () => {
  const pathname = usePathname();
  const { theme, setPreference } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close the panel whenever navigation lands on a new route.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Focus the first link when the panel opens.
  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);

  // Close on any press outside the nav. If focus was inside the panel,
  // hand it back to the button so it isn't dropped on a hidden element.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current?.contains(event.target as Node)) return;
      if (navRef.current?.contains(document.activeElement)) {
        menuButtonRef.current?.focus();
      }
      setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  const handleNavKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && menuOpen) {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  const barClass =
    "absolute left-0 block h-0.5 w-6 rounded-full bg-ink transition-all duration-200";

  return (
    <header>
      <div className="flex flex-col items-center px-4 pt-6 text-center">
        <button
          // Remount on every route change so the marker-sweep animation
          // replays when a new page loads.
          key={pathname}
          type="button"
          onClick={() => setPreference(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
          className="logo-toggle logo-marker mb-[0.9rem] rounded-sm p-1"
        >
          <Logo width={122.3365} height={92.13775} />
        </button>
        <Link href="/" className="no-underline">
          <span className="mb-1 inline-block px-1 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Lane Garner
          </span>
          <span className="block text-base font-light text-ink-soft sm:text-lg">
            Web and Mobile Developer
          </span>
        </Link>
      </div>

      <nav
        ref={navRef}
        aria-label="Main"
        onKeyDown={handleNavKeyDown}
        className="sticky top-0 z-50 bg-paper"
      >
        {/* Mobile: hamburger disclosure (below sm) */}
        <div className="relative flex justify-center sm:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label="Menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-sm"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={cn(
                  barClass,
                  menuOpen ? "top-[7px] rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  barClass,
                  "top-[7px]",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  barClass,
                  menuOpen ? "top-[7px] -rotate-45" : "top-[14px]"
                )}
              />
            </span>
          </button>
          <div
            id="mobile-nav-panel"
            hidden={!menuOpen}
            className="absolute inset-x-0 top-full border-b-2 border-accent bg-paper shadow-lift"
          >
            <ul className="flex list-none flex-col px-2 py-2 text-center">
              {NAV_ITEMS.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex min-h-[44px] items-center justify-center px-4 py-2 text-[1.06em] no-underline transition-colors",
                        active
                          ? "font-semibold text-ink-soft"
                          : "text-ink-subtle hover:text-ink-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[44px] items-center justify-center px-4 py-2 text-[1.06em] text-ink-subtle no-underline transition-colors hover:text-ink-muted"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop: the original centered link row (sm and up) */}
        <ul className="mx-auto hidden max-w-3xl flex-wrap items-center justify-center px-2 pb-1 sm:flex sm:gap-4">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-block px-2 py-2.5 text-[1.06em] no-underline transition-colors",
                    active
                      ? "font-semibold text-ink-soft"
                      : "text-ink-subtle hover:text-ink-muted"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-2 py-2.5 text-[1.06em] text-ink-subtle no-underline transition-colors hover:text-ink-muted"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
