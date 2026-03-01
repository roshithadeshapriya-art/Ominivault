import React from "react";
import { Helmet } from "react-helmet-async";
import { AdContainer } from "../components/AdContainer";
import { DinoGame } from "../components/DinoGame";

export function GlobalBriefing() {
  return (
    <div className="space-y-8">
      <Helmet>
        <title>The Temporary | Global Briefing</title>
        <meta name="description" content="Global news, technology updates, and business intelligence." />
      </Helmet>
      
      <div className="border-b-4 border-ink pb-6 mb-8 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfbf7] px-4">
          <span className="text-ink font-serif font-bold tracking-widest text-sm uppercase">Latest Edition</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2 mt-4 text-ink">Global Briefing</h1>
        <p className="font-serif italic text-xl text-ink">Technology, Business, Government & Privacy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Left Column - Main Story */}
        <div className="md:col-span-8 space-y-8">
          <article className="border-b-2 border-ink pb-8">
            <h2 className="text-4xl md:text-6xl font-black font-serif leading-none mb-4 tracking-tighter text-ink uppercase">
              The Physics of the Jump: How We Code Simple Game Loops
            </h2>
            <div className="text-xs uppercase tracking-widest font-serif font-bold border-y border-ink py-2 mb-6 text-ink flex justify-between">
              <span>By The Beekeeper</span>
              <span>March 1, 2026</span>
            </div>
            
            <div className="mb-8">
              <DinoGame />
            </div>

            <div className="columns-1 md:columns-2 gap-8 text-justify font-serif text-sm leading-relaxed text-ink">
              <p className="mb-4">
                <span className="float-left text-5xl font-black leading-none pr-2 pt-1">G</span>ame loops are the beating heart of any interactive digital experience. At their core, they are infinite cycles that read user input, update the game state, and render the results to the screen. In our implementation of the classic endless runner above, the loop runs at roughly sixty frames per second, creating the illusion of smooth motion.
              </p>
              <p className="mb-4">
                The physics of the jump rely on two simple variables: velocity and gravity. When the player initiates a jump, a negative velocity is applied to the character's vertical axis, propelling them upwards. In every subsequent frame, a constant positive gravity value is added to this velocity, gradually slowing the ascent until the character begins to fall back to the ground.
              </p>
              <p className="mb-4">
                Collision detection is another critical component. The system constantly checks if the bounding box of the character intersects with the bounding box of any incoming obstacles. This requires precise mathematical calculations on every single frame. If an intersection is detected, the game loop halts, and the "Game Over" state is triggered.
              </p>
              <p className="mb-4">
                Building these systems from scratch, even for simple 2D games, provides invaluable insight into performance optimization and state management. It forces developers to think in terms of continuous execution rather than event-driven responses, a paradigm shift that is essential for mastering real-time applications.
              </p>
            </div>
          </article>

          <article className="border-b-2 border-ink pb-8">
            <h2 className="text-4xl md:text-6xl font-black font-serif leading-none mb-4 tracking-tighter text-ink uppercase">
              The Silicon Renaissance: A New Era of Microprocessors
            </h2>
            <div className="text-xs uppercase tracking-widest font-serif font-bold border-y border-ink py-2 mb-6 text-ink flex justify-between">
              <span>By The Beekeeper</span>
              <span>March 1, 2026</span>
            </div>
            <div className="columns-1 md:columns-2 gap-8 text-justify font-serif text-sm leading-relaxed text-ink">
              <p className="mb-4">
                <span className="float-left text-5xl font-black leading-none pr-2 pt-1">I</span>n an unprecedented shift within the semiconductor industry, major fabrication plants are reporting a return to fundamental architectural redesigns. For decades, the relentless pursuit of Moore's Law dictated smaller transistors and denser packaging. However, physical limitations have forced engineers to reconsider the very foundation of logic gates.
              </p>
              <p className="mb-4">
                Recent developments in photonics and quantum-tunneling transistors suggest that the next leap in computational power will not come from shrinking silicon, but from altering the medium of data transfer itself. Light-based data buses on the die are now moving from experimental laboratories to early-stage production lines, promising a tenfold increase in bandwidth with a fraction of the thermal output.
              </p>
              <p className="mb-4">
                This paradigm shift is not without its challenges. The manufacturing precision required for optical interconnects at the nanometer scale introduces unprecedented defect rates. Yields for these next-generation chips currently hover below 30%, making them commercially unviable for consumer electronics in the immediate future.
              </p>
              <p className="mb-4">
                Yet, the enterprise sector remains undeterred. High-frequency trading firms and massive data centers, constrained by power consumption and heat dissipation, are eagerly funding these ventures. The "Silicon Renaissance" is less about making chips smaller, and more about making them fundamentally smarter and cooler. As we look towards the end of the decade, the traditional CPU may become a relic, replaced by hybrid electro-optical processing units.
              </p>
            </div>
          </article>

          <div className="my-8 text-center text-xs font-mono text-ink border border-dashed border-ink p-4 bg-ink/5">
            AD_SPACE_OPTIMIZED - HORIZONTAL BANNER
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="border-r-0 md:border-r-2 border-ink md:pr-8">
              <h3 className="text-2xl font-bold font-serif leading-tight mb-3 text-ink italic">
                Supply Chain Disruptions Stabilize Amidst New Trade Agreements
              </h3>
              <p className="font-serif text-sm leading-relaxed text-ink text-justify mb-4">
                Global logistics networks, which have experienced severe volatility over the past three years, are finally showing signs of stabilization. A series of bilateral trade agreements signed late last month has eased tariffs on crucial raw materials, particularly rare earth metals essential for battery production and electronics manufacturing.
              </p>
              <p className="font-serif text-sm leading-relaxed text-ink text-justify">
                Analysts predict a 15% reduction in component lead times by the third quarter. However, experts warn that the system remains fragile. A single geopolitical event or natural disaster in a key manufacturing hub could quickly reverse these gains. Companies are advised to maintain diversified sourcing strategies rather than returning to strict just-in-time inventory models.
              </p>
            </article>

            <article>
              <h3 className="text-3xl font-black font-serif leading-none mb-3 text-ink uppercase tracking-tight">
                The Privacy Paradox
              </h3>
              <p className="font-serif text-sm leading-relaxed text-ink text-justify mb-4">
                As digital surveillance capabilities grow, so too does consumer demand for absolute privacy. This paradox is driving a surge in decentralized communication protocols and hardware-level encryption modules.
              </p>
              <p className="font-serif text-sm leading-relaxed text-ink text-justify">
                Startups focusing on "zero-knowledge" architectures are receiving record venture capital funding. These systems allow users to verify identity or complete transactions without ever exposing the underlying data to the service provider. The challenge now lies in user experience; making these highly secure systems accessible to the average consumer without requiring a degree in cryptography.
              </p>
            </article>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="md:col-span-4 space-y-8 border-t-4 md:border-t-0 md:border-l-4 border-ink pt-8 md:pt-0 md:pl-8">
          
          <div className="border-4 border-ink p-4 text-center">
            <h4 className="font-serif font-black uppercase tracking-widest text-xl border-b-2 border-ink pb-2 mb-4 text-ink">
              Notice to Readers
            </h4>
            <p className="font-serif text-sm italic text-ink">
              The Temporary is published daily. All data presented herein is verified to the best of our abilities at the time of printing.
            </p>
          </div>

          <article className="border-b-2 border-ink pb-6">
            <h3 className="text-xl font-bold font-serif leading-tight mb-2 text-ink">
              Local Markets Report
            </h3>
            <p className="font-serif text-xs leading-relaxed text-ink text-justify">
              Trading volumes remained light throughout the morning session. Investors appear hesitant ahead of the upcoming central bank symposium. Tech stocks showed slight resilience, buoyed by positive earnings reports from mid-cap software firms.
            </p>
          </article>

          <div className="border border-ink p-4 bg-ink/5">
            <div className="text-[10px] uppercase tracking-widest font-serif font-bold border-b border-ink pb-1 mb-3 text-center text-ink">
              Sponsored Content
            </div>
            <AdContainer 
              className="w-full aspect-square" 
              format="rectangle" 
              label="" 
            />
          </div>

          <article>
            <h3 className="text-lg font-bold font-serif leading-tight mb-2 text-ink uppercase tracking-widest">
              Weather & Transit
            </h3>
            <p className="font-serif text-xs leading-relaxed text-ink text-justify">
              Clear skies expected across major metropolitan areas today. Commuters should anticipate standard delays on the northern rail corridor due to ongoing track maintenance. Maritime shipping routes report calm seas.
            </p>
          </article>

        </div>
      </div>
    </div>
  );
}
