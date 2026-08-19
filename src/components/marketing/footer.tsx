import { NewsletterForm } from "./newsletter-form";

export function Footer({ companyName, contactEmail }: { companyName: string; contactEmail: string }) {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-medium">Stay in the loop</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Occasional updates on what we&apos;re building. No spam.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <a href={`mailto:${contactEmail}`} className="hover:underline">
            {contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}