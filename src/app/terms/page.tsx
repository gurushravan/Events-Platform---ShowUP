export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-white">
      <h1 className="mb-6 text-3xl font-semibold">
        Terms of Service
      </h1>

      <p className="mb-8 text-sm text-white/70">
        By accessing or using the Events platform, you agree to be bound by these
        Terms of Service. Please read them carefully.
      </p>

      <div className="space-y-8">
        {/* Section 1 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            1. Use of the Platform
          </h2>
          <p className="text-sm text-white/70">
            You must be at least 18 years old to use this platform. You agree to
            use the platform only for lawful purposes and in compliance with all
            applicable laws and regulations.
          </p>
        </section>

        {/* Section 2 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            2. Accounts and Access
          </h2>
          <p className="text-sm text-white/70">
            You are responsible for maintaining the confidentiality of your
            account credentials. Any activity performed under your account is
            your responsibility.
          </p>
        </section>

        {/* Section 3 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            3. Events and Bookings
          </h2>
          <p className="text-sm text-white/70">
            Event details are provided by organizers. We do not guarantee the
            accuracy of event information and are not responsible for changes,
            cancellations or disputes between attendees and organizers.
          </p>
        </section>

        {/* Section 4 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            4. Payments and Refunds
          </h2>
          <p className="text-sm text-white/70">
            Payments are processed securely. Refund policies are determined by
            individual event organizers unless otherwise stated.
          </p>
        </section>

        {/* Section 5 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            5. Limitation of Liability
          </h2>
          <p className="text-sm text-white/70">
            The platform is provided “as is.” We are not liable for any indirect,
            incidental or consequential damages arising from your use of the
            platform.
          </p>
        </section>

        {/* Section 6 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            6. Termination
          </h2>
          <p className="text-sm text-white/70">
            We reserve the right to suspend or terminate access to the platform
            at our discretion if these terms are violated.
          </p>
        </section>

        {/* Section 7 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            7. Changes to These Terms
          </h2>
          <p className="text-sm text-white/70">
            We may update these Terms of Service from time to time. Continued use
            of the platform after changes indicates acceptance of the updated
            terms.
          </p>
        </section>
      </div>
    </main>
  )
}
