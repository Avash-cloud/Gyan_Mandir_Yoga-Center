import SEO from "../components/SEO";

export default function TermsOfService() {
  return (
    <>
      <SEO title="Terms of Service" />
      <div className="max-w-3xl mx-auto py-16 px-4 space-y-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkgreen dark:text-white">
          Terms & Conditions
        </h1>
        <p className="text-zinc-500 text-xs">Last Updated: July 03, 2026</p>
        
        <p className="text-zinc-650 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          Welcome to Gyan Mandir . By browsing this website or enrolling in our yoga sessions, you agree to comply with and be bound by the following terms.
        </p>

        <h3 className="font-serif text-xl font-bold text-brand-darkgreen dark:text-white pt-4">
          1. Class Registrations & Medical Clearances
        </h3>
        <p className="text-zinc-650 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          It is the participant's responsibility to consult with a physician before starting any physical exercises. If you have pre-existing cardiovascular conditions, back/herniated issues, or are pregnant, you must declare this during enrollment so our instructors can offer appropriate posture modifications.
        </p>

        <h3 className="font-serif text-xl font-bold text-brand-darkgreen dark:text-white pt-4">
          2. Class Cancellations & Refunds
        </h3>
        <p className="text-zinc-650 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          Individual drop-in passes are valid only for the booked time slot. Monthly packages must be utilized within the calendar month and are non-transferable and non-refundable unless specified otherwise by the management due to scheduling adjustments.
        </p>

        <h3 className="font-serif text-xl font-bold text-brand-darkgreen dark:text-white pt-4">
          3. Revisions to Terms
        </h3>
        <p className="text-zinc-650 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          We reserve the right to revise our schedules, class packages, or terms at any time. Changes will be posted dynamically on the timetable page.
        </p>
      </div>
    </>
  );
}
