import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Lane Garner.",
};

const ContactPage = () => {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6">
      <h1 className="mb-4 text-center text-4xl font-extrabold sm:text-5xl">
        Contact
      </h1>
      <div className="mb-10 flex flex-col gap-2 text-center text-lg font-light text-ink-soft">
        <span className="font-bold">Want to get in touch?</span>
        <span>Use the form below and I&apos;ll get back to you.</span>
      </div>

      <ContactForm />
    </div>
  );
};

export default ContactPage;
