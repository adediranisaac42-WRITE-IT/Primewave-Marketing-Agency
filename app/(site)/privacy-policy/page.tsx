import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Privacy Policy", description: `How ${site.name} collects and uses personal data.`, path: "/privacy-policy" });

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      sections={[
        { h: "Who we are", p: [`${site.name} ("Primewave", "we", "us") provides digital marketing, website development, e-commerce and CRM services. This policy explains how we handle personal data submitted through this website.`] },
        { h: "Information we collect", p: ["When you submit our contact form we collect your name, email address, business name, website URL, the service you are interested in, your budget range and your project description. We also record basic technical information (such as your browser type) to help prevent spam."] },
        { h: "How we use it", p: ["We use this information to respond to your enquiry, arrange consultations, provide our services and keep records of our business relationship. Our lawful bases are legitimate interests and, where applicable, taking steps at your request before entering into a contract."] },
        { h: "Storage and security", p: ["Enquiries are stored securely with our database provider (Supabase) with access restricted to authorised administrators. We keep data only for as long as necessary for the purposes above."] },
        { h: "Your rights", p: ["Under UK GDPR you may request access to, correction of or deletion of your personal data, and you may object to or restrict certain processing. To make a request, please contact us through the contact page."] },
        { h: "Cookies", p: ["This website uses only essential cookies needed for security and the administrator login. If analytics or marketing cookies are added, this policy will be updated and consent will be requested."] },
      ]}
    />
  );
}
