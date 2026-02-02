export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-white">
      <h1 className="mb-6 text-3xl font-semibold">
        Privacy Policy
      </h1>

      <p className="mb-8 text-sm text-white/70">
        This Privacy Policy explains how the Events platform collects, uses and
        protects your personal information when you use our services.
      </p>

      <div className="space-y-8">
        {/* Section 1 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            1. Information We Collect
          </h2>
          <p className="text-sm text-white/70">
            We may collect personal information such as your name, email address
            and account details when you register or interact with the platform.
          </p>
        </section>

        {/* Section 2 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-white/70">
            <li>To provide and maintain the platform</li>
            <li>To process event bookings and transactions</li>
            <li>To communicate important updates or notifications</li>
            <li>To improve platform performance and user experience</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            3. Sharing of Information
          </h2>
          <p className="text-sm text-white/70">
            We do not sell your personal information. Your data may be shared
            with event organizers only as necessary to facilitate bookings or
            when required by law.
          </p>
        </section>

        {/* Section 4 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            4. Data Security
          </h2>
          <p className="text-sm text-white/70">
            We implement reasonable security measures to protect your personal
            data. However, no method of transmission over the internet is
            completely secure.
          </p>
        </section>

        {/* Section 5 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            5. Cookies and Tracking
          </h2>
          <p className="text-sm text-white/70">
            We may use cookies or similar technologies to enhance your browsing
            experience and analyze platform usage.
          </p>
        </section>

        {/* Section 6 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            6. Your Rights
          </h2>
          <p className="text-sm text-white/70">
            You may request access, correction or deletion of your personal
            information, subject to applicable laws and platform requirements.
          </p>
        </section>

        {/* Section 7 */}
        <section className="rounded-lg border border-white/10 bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="mb-2 text-lg font-semibold">
            7. Changes to This Policy
          </h2>
          <p className="text-sm text-white/70">
            We may update this Privacy Policy from time to time. Continued use of
            the platform after changes indicates acceptance of the updated
            policy.
          </p>
        </section>
      </div>
    </main>
  )
}
