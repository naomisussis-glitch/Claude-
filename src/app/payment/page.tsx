"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm({
  paymentIntentId,
  onSuccess,
}: {
  paymentIntentId: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMsg("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMsg(error.message || "Payment failed. Please try again.");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      sessionStorage.setItem("styleTypePaymentIntentId", paymentIntentId);
      onSuccess();
    } else {
      setErrorMsg("Payment could not be confirmed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
      {errorMsg && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">
          {errorMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn-primary w-full text-center"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing payment...
          </span>
        ) : (
          "Pay $4.99 & Get My Results →"
        )}
      </button>
      <p className="text-xs text-center text-stone-400">
        Secured by Stripe · Your card info is never stored on our servers.
      </p>
    </form>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const formData = sessionStorage.getItem("styleTypeFormData");
    if (!formData) {
      router.push("/analyze");
      return;
    }

    const createIntent = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionData: JSON.parse(formData) }),
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        } else {
          setError("Failed to initialize payment. Please go back and try again.");
        }
      } catch {
        setError("Network error. Please check your connection and try again.");
      }
    };

    createIntent();
  }, [router]);

  const runAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    try {
      const formDataRaw = sessionStorage.getItem("styleTypeFormData");
      const imageDataUrl = sessionStorage.getItem("styleTypeImage");
      const imageType = sessionStorage.getItem("styleTypeImageType");
      const piId = sessionStorage.getItem("styleTypePaymentIntentId");

      if (!formDataRaw || !piId) {
        setError("Session data missing. Please start over.");
        setIsAnalyzing(false);
        return;
      }

      const formData = JSON.parse(formDataRaw);
      const fd = new FormData();
      fd.append("paymentIntentId", piId);
      fd.append("height", formData.height);
      fd.append("weight", formData.weight);
      fd.append("age", formData.age);
      fd.append("gender", formData.gender);
      fd.append("shoulderType", formData.shoulderType);
      fd.append("hipType", formData.hipType);
      fd.append("additionalNotes", formData.additionalNotes || "");

      if (imageDataUrl && imageType) {
        const res = await fetch(imageDataUrl);
        const blob = await res.blob();
        fd.append("image", blob, `photo.${imageType.split("/")[1]}`);
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: fd,
      });

      const result = await response.json();
      if (result.success) {
        sessionStorage.setItem("styleTypeResults", JSON.stringify(result));
        // Clean up sensitive session data
        sessionStorage.removeItem("styleTypeImage");
        router.push("/results");
      } else {
        setError(result.error || "Analysis failed. Please contact support.");
        setIsAnalyzing(false);
      }
    } catch {
      setError("Something went wrong during analysis. Please contact support.");
      setIsAnalyzing(false);
    }
  }, [router]);

  const handlePaymentSuccess = useCallback(() => {
    runAnalysis();
  }, [runAnalysis]);

  if (isAnalyzing) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6 animate-pulse">✦</div>
        <h2 className="text-2xl font-semibold text-charcoal mb-3">
          Analyzing your body type...
        </h2>
        <p className="text-stone-500 mb-8">
          Our AI is studying your details using the Kibbe system. This usually takes
          30–60 seconds.
        </p>
        <div className="flex justify-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gold animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <div className="mt-10 text-sm text-stone-400 space-y-1">
          <p>✓ Payment confirmed</p>
          <p>◎ Identifying Kibbe type...</p>
          <p className="text-stone-300">◇ Curating recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-6">⚠</div>
        <h2 className="text-xl font-semibold text-charcoal mb-3">Something went wrong</h2>
        <p className="text-stone-500 mb-8">{error}</p>
        <button onClick={() => router.push("/analyze")} className="btn-secondary">
          ← Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      {/* Order summary */}
      <div className="card mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-charcoal">StyleType AI Analysis</h3>
            <p className="text-sm text-stone-500 mt-0.5">
              Kibbe body type · Clothing guide · Brand recommendations
            </p>
          </div>
          <span className="font-semibold text-charcoal text-lg">$4.99</span>
        </div>
        <div className="border-t border-stone-100 mt-4 pt-4 text-xs text-stone-400 space-y-1">
          <p>✓ One-time charge — no subscription</p>
          <p>✓ Results delivered instantly after payment</p>
          <p>✓ 13 Kibbe types analyzed with full style guide</p>
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold text-charcoal mb-5">Payment details</h2>
        {clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#2C2C2C",
                  colorBackground: "#ffffff",
                  colorText: "#2C2C2C",
                  colorDanger: "#ef4444",
                  fontFamily: "system-ui, sans-serif",
                  borderRadius: "12px",
                },
              },
            }}
          >
            <CheckoutForm
              paymentIntentId={paymentIntentId!}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        ) : (
          <div className="py-8 flex justify-center">
            <div className="w-6 h-6 border-2 border-stone-200 border-t-charcoal rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
