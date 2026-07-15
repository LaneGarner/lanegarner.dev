"use client";

/**
 * Client boundary for @tutti-ui/react.
 *
 * The published package doesn't include "use client" banners, so importing it
 * directly from a React Server Component executes createContext during
 * server rendering. Server components import tutti-ui through this module
 * instead, which marks every export as a client reference.
 */
export * from "@tutti-ui/react";
