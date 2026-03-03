import Link from "next/link";

const KIBBE_TYPES = [
  { name: "Dramatic", emoji: "✦", desc: "Sharp, angular, elongated" },
  { name: "Natural", emoji: "◈", desc: "Broad, relaxed, athletic" },
  { name: "Classic", emoji: "◎", desc: "Balanced, symmetrical, timeless" },
  { name: "Gamine", emoji: "◇", desc: "Petite, playful, contrasted" },
  { name: "Romantic", emoji: "◉", desc: "Lush, curved, ultra-feminine" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload a photo",
    desc: "A full-body photo works best. We analyze your proportions, bone structure, and natural features.",
  },
  {
    step: "02",
    title: "Enter your details",
    desc: "Height, weight, age, and a few quick questions about your frame help us refine the analysis.",
  },
  {
    step: "03",
    title: "Pay & unlock results",
    desc: "A one-time $4.99 fee. No subscription, no hidden costs. Your results are yours forever.",
  },
  {
    step: "04",
    title: "Get your style guide",
    desc: "Your Kibbe type, what to wear (and avoid), plus curated brand picks at budget, mid, and luxury tiers.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I've been buying the wrong clothes for years. This finally explained why nothing fit 'right' — and now I shop with confidence.",
    name: "Priya M.",
    type: "Soft Natural",
  },
  {
    quote:
      "Worth every penny. The brand recommendations alone saved me from expensive mistakes.",
    name: "Cass R.",
    type: "Dramatic Classic",
  },
  {
    quote:
      "I was skeptical about the Kibbe system but the analysis was eerily accurate. My wardrobe makes sense now.",
    name: "Jordan T.",
    type: "Flamboyant Gamine",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          Powered by Claude AI · Kibbe Body Type System
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold text-charcoal leading-tight mb-6 tracking-tight">
          Know your body.
          <br />
          <span className="text-gold">Own your style.</span>
        </h1>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload a photo, answer a few questions, and our AI identifies your Kibbe body
          type — then tells you exactly what to wear and which brands to shop, at every
          price point.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/analyze" className="btn-primary text-base px-10 py-4">
            Analyze My Body Type — $4.99
          </Link>
          <a href="#how-it-works" className="text-stone-500 hover:text-charcoal text-base underline underline-offset-4">
            See how it works
          </a>
        </div>
        <p className="mt-5 text-sm text-stone-400">One-time fee · No subscription · Instant results</p>
      </section>

      {/* Body Types Preview */}
      <section className="bg-white border-y border-stone-100 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm font-medium text-stone-400 uppercase tracking-widest mb-8">
            13 Kibbe types analyzed
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {KIBBE_TYPES.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-2.5 bg-cream border border-stone-100 rounded-full px-5 py-2.5"
              >
                <span className="text-gold text-sm">{t.emoji}</span>
                <span className="font-medium text-charcoal text-sm">{t.name}</span>
                <span className="text-stone-400 text-xs hidden sm:inline">· {t.desc}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 bg-cream border border-stone-100 rounded-full px-5 py-2.5">
              <span className="text-stone-400 text-sm">+8 more types</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 py-24">
        <h2 className="section-title text-center mb-4">How it works</h2>
        <p className="text-stone-500 text-center mb-16 max-w-xl mx-auto">
          From photo to personalized style guide in under 2 minutes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="card flex gap-5">
              <span className="text-4xl font-light text-stone-200 leading-none shrink-0">
                {item.step}
              </span>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-charcoal py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-cream text-center mb-4">
            What&apos;s in your report
          </h2>
          <p className="text-stone-400 text-center mb-16 max-w-xl mx-auto">
            Everything you need to build a wardrobe that actually works for your body.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "◎",
                title: "Your Kibbe Type",
                desc: "Identified from all 13 types with confidence score and reasoning.",
              },
              {
                icon: "✓",
                title: "What to Wear",
                desc: "Specific silhouettes, cuts, and styles that harmonize with your natural features.",
              },
              {
                icon: "✕",
                title: "What to Avoid",
                desc: "Common mistakes for your type — stop buying clothes that fight your body.",
              },
              {
                icon: "◈",
                title: "Key Wardrobe Pieces",
                desc: "The exact items to invest in that form the foundation of your style.",
              },
              {
                icon: "◇",
                title: "Fabric & Color Guide",
                desc: "Which fabrics and color palettes work best for your type and energy.",
              },
              {
                icon: "◉",
                title: "Brand Recommendations",
                desc: "Curated brands at budget ($20–80), mid-range ($80–400), and luxury ($400+) tiers.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <span className="text-gold text-2xl block mb-3">{item.icon}</span>
                <h3 className="font-semibold text-cream mb-2">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <h2 className="section-title text-center mb-16">Real results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card">
              <div className="text-gold text-2xl mb-4">&ldquo;</div>
              <p className="text-stone-600 text-sm leading-relaxed mb-5">{t.quote}</p>
              <div>
                <p className="font-medium text-charcoal text-sm">{t.name}</p>
                <p className="text-stone-400 text-xs">Kibbe Type: {t.type}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-50 border-y border-amber-100 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold text-charcoal mb-4">
            Ready to find your type?
          </h2>
          <p className="text-stone-500 mb-10 leading-relaxed">
            Join thousands who&apos;ve stopped guessing and started dressing for their
            actual body. One analysis. One fee. A wardrobe that finally makes sense.
          </p>
          <Link href="/analyze" className="btn-primary text-base px-12 py-4 inline-block">
            Start My Analysis — $4.99
          </Link>
          <p className="mt-4 text-sm text-stone-400">
            Secure payment via Stripe · Results in under 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
}
