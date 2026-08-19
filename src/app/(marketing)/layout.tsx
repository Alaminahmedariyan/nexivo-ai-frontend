import { getSiteSettingsMap } from "@/lib/api/public/site-settings";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const FALLBACK_SETTINGS = {
  companyName: "Nexivo AI",
  contactEmail: "hello@nexivo.ai",
};

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  // Never let a settings-fetch failure take down the entire marketing
  // site — fall back to hardcoded defaults so pages still render.
  const settings = await getSiteSettingsMap().catch(() => FALLBACK_SETTINGS);

  const companyName = (settings.companyName as string) ?? FALLBACK_SETTINGS.companyName;
  const contactEmail = (settings.contactEmail as string) ?? FALLBACK_SETTINGS.contactEmail;

  return (
    <div>
      <Navbar companyName={companyName} />
      <main>{children}</main>
      <Footer companyName={companyName} contactEmail={contactEmail} />
    </div>
  );
}