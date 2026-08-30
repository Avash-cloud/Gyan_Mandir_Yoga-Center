import SEO from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy" />
      <div className="max-w-3xl mx-auto py-16 px-4 space-y-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkgreen dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-zinc-500 text-xs">Last Updated: July 03, 2026</p>
        
        <p className="text-zinc-650 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          At Gyan Mandir , we are dedicated to protecting your privacy. This policy outlines how we collect, use, and safe-keep details provided when you enroll in classes, fill contact forms, or register for newsletters.
        </p>

        <h3 className="font-serif text-xl font-bold text-brand-darkgreen dark:text-white pt-4">
          1. Information We Collect
        </h3>
        <p className="text-zinc-650 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          We collect personal details (such as your full name, email address, phone number, and physical medical history or comments) when you voluntarily submit request forms on our site.
        </p>

        <h3 className="font-serif text-xl font-bold text-brand-darkgreen dark:text-white pt-4">
          2. How We Use Information
        </h3>
        <p className="text-zinc-650 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          We use your contact details solely to manage class schedules, verify health details for gentle/therapeutic adaptations, and answer queries. We do not sell or lease details to third-party advertisers.
        </p>

        <h3 className="font-serif text-xl font-bold text-brand-darkgreen dark:text-white pt-4">
          3. Security & Safety
        </h3>
        <p className="text-zinc-650 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          All data details are protected using standard web server security measures to safeguard against unauthorized logins, alterations, or disclosures.
        </p>
      </div>
    </>
  );
}
