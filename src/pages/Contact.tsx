import React from "react";
import { motion } from "motion/react";

export function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-12 pb-16"
    >
      <header className="border-b-4 border-ink pb-8 mb-12">
        <h1 className="font-serif font-black text-5xl md:text-7xl tracking-tighter uppercase mb-4 text-ink">
          Contact
        </h1>
        <p className="font-serif text-xl md:text-2xl italic text-ink/80 leading-relaxed">
          Reach out to the Beekeeper.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="font-serif font-bold text-2xl uppercase tracking-widest border-b-2 border-ink/20 pb-2">
          General Inquiries
        </h2>
        <p className="font-sans text-lg leading-relaxed text-ink/90">
          For questions, feedback, or collaboration opportunities, please reach out via email.
        </p>
        <div className="border border-ink p-6 bg-white/50 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
          <p className="font-mono text-lg font-bold">
            contact@thetemporary.com
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-serif font-bold text-2xl uppercase tracking-widest border-b-2 border-ink/20 pb-2">
          Secure Communications
        </h2>
        <p className="font-sans text-lg leading-relaxed text-ink/90">
          For sensitive information, please use the PGP key provided below.
        </p>
        <div className="border border-ink p-6 bg-ink text-white shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] overflow-x-auto">
          <pre className="font-mono text-xs leading-relaxed">
{`-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBGI... (Placeholder for actual PGP Key) ...
...
-----END PGP PUBLIC KEY BLOCK-----`}
          </pre>
        </div>
      </section>
    </motion.div>
  );
}
