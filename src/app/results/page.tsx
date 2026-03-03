"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { KibbeType, PricePoint } from "@/lib/kibbe";

interface AnalysisResult {
  kibbeType: KibbeType;
  confidence: string;
  reasoning: string;
  keyFeatures: string[];
  additionalStyleTips: string;
  profile: {
    description: string;
    doWear: string[];
    avoid: string[];
    keyPieces: string[];
    silhouettes: string[];
    fabricRecommendations: string[];
    colorGuidance: string;
    pricePoints: PricePoint[];
    celebrities: string[];
  };
}

const PRICE_TIER_COLORS: Record<PricePoint["tier"], string> = {
  Budget: "bg-emerald-50 border-emerald-100 text-emerald-800",
  "Mid-Range": "bg-blue-50 border-blue-100 text-blue-800",
  Luxury: "bg-amber-50 border-amber-100 text-amber-800",
};

const PRICE_TIER_BADGES: Record<PricePoint["tier"], string> = {
  Budget: "bg-emerald-100 text-emerald-700",
  "Mid-Range": "bg-blue-100 text-blue-700",
  Luxury: "bg-amber-100 text-amber-700",
};

const CONFIDENCE_COLORS: Record<string, string> = {
  High: "text-emerald-600 bg-emerald-50 border-emerald-100",
  Medium: "text-amber-600 bg-amber-50 border-amber-100",
  Low: "text-stone-500 bg-stone-50 border-stone-100",
};

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("styleTypeResults");
    if (!stored) {
      router.push("/analyze");
      return;
    }
    try {
      setResult(JSON.parse(stored));
    } catch {
      router.push("/analyze");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-6 h-6 border-2 border-stone-200 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  const { profile } = result;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero result */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-sm text-stone-500 mb-4">
          <span className="text-gold">✦</span> Your StyleType AI Analysis
        </div>
        <h1 className="text-5xl font-semibold text-charcoal mb-3 tracking-tight">
          {result.kibbeType}
        </h1>
        <div className="flex items-center justify-center gap-3 mb-5">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full border ${
              CONFIDENCE_COLORS[result.confidence] || CONFIDENCE_COLORS.Medium
            }`}
          >
            {result.confidence} confidence
          </span>
        </div>
        <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">
          {profile.description}
        </p>
      </div>

      {/* AI Reasoning */}
      <div className="card mb-6 bg-amber-50 border-amber-100">
        <div className="flex items-start gap-3">
          <span className="text-gold text-xl shrink-0 mt-0.5">◎</span>
          <div>
            <h2 className="font-semibold text-charcoal mb-2">Why you&apos;re a {result.kibbeType}</h2>
            <p className="text-stone-600 text-sm leading-relaxed">{result.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      {result.keyFeatures?.length > 0 && (
        <div className="card mb-6">
          <h2 className="font-semibold text-charcoal mb-4">Your defining features</h2>
          <div className="flex flex-wrap gap-2">
            {result.keyFeatures.map((f) => (
              <span key={f} className="tag">{f}</span>
            ))}
          </div>
        </div>
      )}

      {/* Do Wear / Avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="card">
          <h2 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Wear these
          </h2>
          <ul className="space-y-2">
            {profile.doWear.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="text-emerald-400 mt-0.5 shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span className="text-red-400">✕</span> Avoid these
          </h2>
          <ul className="space-y-2">
            {profile.avoid.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="text-red-300 mt-0.5 shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Silhouettes & Key Pieces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="card">
          <h2 className="font-semibold text-charcoal mb-4">Best silhouettes</h2>
          <div className="flex flex-wrap gap-2">
            {profile.silhouettes.map((s) => (
              <span key={s} className="tag-gold">{s}</span>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="font-semibold text-charcoal mb-4">Key wardrobe pieces</h2>
          <ul className="space-y-1.5">
            {profile.keyPieces.map((p) => (
              <li key={p} className="text-sm text-stone-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fabrics & Color */}
      <div className="card mb-6">
        <h2 className="font-semibold text-charcoal mb-5">Fabrics & color guidance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
              Best fabrics
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.fabricRecommendations.map((f) => (
                <span key={f} className="tag">{f}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
              Color palette
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">{profile.colorGuidance}</p>
          </div>
        </div>
      </div>

      {/* Brand Recommendations */}
      <div className="mb-6">
        <h2 className="section-title mb-2">Brand recommendations</h2>
        <p className="text-stone-500 text-sm mb-5">
          Curated picks across three price tiers — brands that consistently nail the
          aesthetics and cuts that work for your type.
        </p>
        <div className="space-y-4">
          {profile.pricePoints.map((tier) => (
            <div
              key={tier.tier}
              className={`rounded-2xl border p-5 ${PRICE_TIER_COLORS[tier.tier]}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      PRICE_TIER_BADGES[tier.tier]
                    }`}
                  >
                    {tier.tier}
                  </span>
                  <span className="ml-3 text-sm font-medium opacity-75">
                    {tier.priceRange}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tier.brands.map((brand) => (
                  <span
                    key={brand}
                    className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-full px-3 py-1.5 text-sm font-medium"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Celebrity Reference */}
      <div className="card mb-6">
        <h2 className="font-semibold text-charcoal mb-3">Style references</h2>
        <p className="text-sm text-stone-500 mb-4">
          These celebrities share your Kibbe type — studying their style can give you great
          inspiration:
        </p>
        <div className="flex flex-wrap gap-2">
          {profile.celebrities.map((c) => (
            <span key={c} className="tag-gold font-medium">{c}</span>
          ))}
        </div>
      </div>

      {/* Personalized Tips */}
      {result.additionalStyleTips && (
        <div className="card mb-10 border-charcoal/10 bg-charcoal text-cream">
          <h2 className="font-semibold mb-3 text-cream">
            ✦ Personalized tips just for you
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed">
            {result.additionalStyleTips}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <p className="text-stone-400 text-sm mb-5">
          Want to analyze a different set of details? Run another analysis for $4.99.
        </p>
        <Link href="/analyze" className="btn-secondary">
          Run Another Analysis
        </Link>
      </div>
    </div>
  );
}
