"use client";

import { forwardRef } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  type CardProps,
  type CardTitleProps,
  type CardDescriptionProps,
} from "@tuttiui/react";
import { cn } from "@tuttiui/shared";

/**
 * Thin wrappers over @tuttiui/react's Card family that layer the site's
 * dark-theme surface tokens on top (tutti cards are light by default).
 * Everything else (padding, structure, variants) is pure tuttiui.
 */
export const SurfaceCard = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "dark:border-[#3a3a3a] dark:bg-surface-alt",
          className
        )}
        {...props}
      />
    );
  }
);
SurfaceCard.displayName = "SurfaceCard";

export const SurfaceCardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <CardTitle ref={ref} className={cn("dark:text-ink", className)} {...props} />
    );
  }
);
SurfaceCardTitle.displayName = "SurfaceCardTitle";

export const SurfaceCardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <CardDescription
      ref={ref}
      className={cn("dark:text-ink-muted", className)}
      {...props}
    />
  );
});
SurfaceCardDescription.displayName = "SurfaceCardDescription";
