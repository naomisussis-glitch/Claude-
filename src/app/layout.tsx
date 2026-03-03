import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StyleType AI — Know Your Body. Own Your Style.",
  description:
    "Discover your Kibbe body type with AI analysis. Get personalized clothing recommendations and brand suggestions at every price point.",
  openGraph: {
    title: "StyleType AI",
    description: "Personalized body type analysis and clothing recommendations powered by AI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream antialiased">
        <header className="border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg text-charcoal tracking-tight">
              StyleType<span className="text-gold"> AI</span>
            </a>
            <a href="/analyze" className="btn-primary text-sm py-2 px-6">
              Get My Analysis →
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-stone-100 mt-24 py-10 text-center text-sm text-stone-400">
          <p>StyleType AI · Powered by Claude &amp; the Kibbe Body Type System</p>
          <p className="mt-1">
            Results are for style guidance only and are not a substitute for professional advice.
          </p>
        </footer>
      </body>
    </html>
  );
}
