import Image from "next/image";

interface CaseScreenshotProps {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

/**
 * A real case-study screenshot (vs. ScreenshotPlaceholder). Rendered as a
 * captioned figure in the same card style as the placeholders it replaces.
 */
export const CaseScreenshot = ({
  src,
  alt,
  caption,
  width,
  height,
}: CaseScreenshotProps) => {
  return (
    <figure className="flex w-full flex-col gap-2">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full rounded-card border border-ink-subtle/30 shadow-lift"
        sizes="(min-width: 768px) 720px, 100vw"
      />
      {caption && (
        <figcaption className="text-center text-sm text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
