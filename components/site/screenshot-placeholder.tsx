interface ScreenshotPlaceholderProps {
  label: string;
  aspect?: "wide" | "tall" | "square";
}

/**
 * Placeholder for a real capture. Each instance names exactly which
 * screenshot belongs in the slot.
 */
export const ScreenshotPlaceholder = ({
  label,
  aspect = "wide",
}: ScreenshotPlaceholderProps) => {
  const aspectClass =
    aspect === "tall"
      ? "aspect-[9/16] max-w-xs"
      : aspect === "square"
        ? "aspect-square max-w-md"
        : "aspect-video";

  return (
    <figure
      className={`flex w-full flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-ink-subtle bg-surface p-6 text-center ${aspectClass}`}
    >
      <span
        aria-hidden="true"
        className="rounded bg-accent px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-black"
      >
        Screenshot placeholder
      </span>
      <figcaption className="text-sm text-ink-muted">{label}</figcaption>
    </figure>
  );
};
