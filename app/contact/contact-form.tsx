"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  FormField,
  Input,
  Label,
  Textarea,
  VStack,
} from "@tutti-ui/react";

/**
 * Contact form built from @tutti-ui/react form primitives.
 *
 * Real submissions via Netlify Forms: the hidden form definition lives in
 * public/__forms.html (Netlify's crawler registers it at deploy time); this
 * component POSTs url-encoded data to that file, which is Netlify's
 * documented pattern for the Next.js App Router. Spam is handled with a
 * honeypot field ("bot-field") instead of reCAPTCHA. On success we route
 * to /thank-you.
 *
 * NOTE: assumes Netlify hosting; see OPEN-QUESTIONS.md (Functionality).
 */
export const ContactForm = () => {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const formData = new FormData(e.currentTarget);
      const body = new URLSearchParams();
      formData.forEach((value, key) => {
        body.append(key, value.toString());
      });
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  };

  const fieldOverrides =
    "";

  return (
    <form onSubmit={handleSubmit} aria-label="Contact form">
      {/* Netlify needs the form name in the POST body */}
      <input type="hidden" name="form-name" value="contact" />
      {/* Honeypot: hidden from real users, bots fill it and get dropped */}
      <p className="hidden" aria-hidden="true">
        <label>
          Don&apos;t fill this out if you&apos;re human:{" "}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <VStack spacing="lg">
        <FormField id="contact-name" name="name" required>
          <Label htmlFor="contact-name">
            Name
          </Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            className={fieldOverrides}
          />
        </FormField>

        <FormField id="contact-email" name="email" required>
          <Label htmlFor="contact-email">
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldOverrides}
          />
        </FormField>

        <FormField id="contact-message" name="message" required>
          <Label htmlFor="contact-message">
            Message
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            className={fieldOverrides}
          />
        </FormField>

        {status === "error" && (
          <p
            role="alert"
            className="rounded-md border-2 border-accent bg-surface px-4 py-3 text-sm font-semibold text-ink"
          >
            Something went wrong sending your message. Please try again in a
            moment.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status === "sending"}
          className="w-fit"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </Button>
      </VStack>
    </form>
  );
};
