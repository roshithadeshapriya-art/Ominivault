import React from "react";

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="border-b-4 border-ink pb-6 mb-8 text-center">
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2">Terms of Service</h1>
        <p className="font-serif italic text-xl">The Rules of Engagement</p>
      </div>

      <div className="font-serif space-y-8 text-lg leading-relaxed text-justify">
        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-widest border-b-2 border-ink pb-2">Copyright & Ownership</h2>
          <p>
            <strong>© 2026 Temporary. All rights reserved.</strong>
          </p>
          <p>
            The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary rights.
          </p>
          <p>
            The distinctive "Newspaper" User Interface (UI) design, including its layout, typography choices, and visual aesthetic, is a proprietary creation of Temporary. Any unauthorized copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-widest border-b-2 border-ink pb-2">Disclaimer</h2>
          <p>
            The tools provided on this platform, specifically the <strong>Card Testing Lab</strong>, are intended strictly for educational, development, and testing purposes.
          </p>
          <p>
            The generated data does not correspond to real-world financial instruments. <strong>No real transactions are possible</strong> using the information provided by these tools. Temporary disclaims any liability for the misuse of the generated data. Users are solely responsible for ensuring their use of the tools complies with all applicable laws and regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-widest border-b-2 border-ink pb-2">Reward Rules</h2>
          <p>
            To maintain the integrity of our platform and ensure fair access for all users, we have established strict guidelines regarding the accumulation of credits through our ad-supported system.
          </p>
          <p>
            Any attempt to circumvent the 60-second ad timer, including but not limited to the use of automated bots, scripts, or Virtual Private Networks (VPNs) to artificially inflate views, is a direct violation of these terms.
          </p>
          <p>
            <strong>Violation of these rules will result in an immediate and irreversible reset of your credit balance to zero.</strong> We reserve the right to monitor activity and enforce these rules at our sole discretion to protect the ecosystem of our publication.
          </p>
        </section>
      </div>
    </div>
  );
}
