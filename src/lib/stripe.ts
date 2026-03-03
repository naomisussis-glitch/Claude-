import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
});

export const ANALYSIS_PRICE_CENTS = parseInt(
  process.env.ANALYSIS_PRICE_CENTS || "499",
  10
);
