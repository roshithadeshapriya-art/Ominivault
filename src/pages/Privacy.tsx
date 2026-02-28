import React from "react";

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="border-b-4 border-ink pb-6 mb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2">Privacy Policy</h1>
        <p className="font-serif italic text-xl">The Editorial Standard on Data Protection</p>
      </div>

      <div className="font-serif space-y-8 text-lg leading-relaxed text-justify">
        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-widest border-b-2 border-ink pb-2">Cookies & Tracking</h2>
          <p>
            To support our publication, we utilize third-party advertising services, notably Google AdSense. These services employ cookies, specifically the DART cookie, to serve advertisements based on your prior visits to our platform and other sites on the internet.
          </p>
          <p>
            Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy. We believe in transparency and encourage our readers to manage their digital footprint responsibly.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-widest border-b-2 border-ink pb-2">Data Collection</h2>
          <p>
            OmniVault operates on a principle of minimal data retention. We utilize your browser's LocalStorage to maintain your session state, preferences, and generated data. 
          </p>
          <p>
            <strong>We do not store your personal user data on our own servers.</strong> The information you generate or view during your session remains confined to your local device, ensuring a private and secure experience.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-widest border-b-2 border-ink pb-2">Third-Party APIs</h2>
          <p>
            To provide our suite of tools and real-time information, we integrate with select third-party Application Programming Interfaces (APIs).
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Mail.tm:</strong> Utilized to provision temporary, disposable email addresses for our readers.</li>
            <li><strong>GNews API:</strong> Employed to fetch the latest global headlines and breaking news for the Global Briefing section.</li>
          </ul>
          <p>
            These services operate under their respective privacy policies. We do not transmit your personal identifying information to these providers beyond what is strictly necessary to fulfill your requests.
          </p>
        </section>
      </div>
    </div>
  );
}
