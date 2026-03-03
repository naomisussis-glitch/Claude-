import { NextRequest, NextResponse } from "next/server";
import { stripe, ANALYSIS_PRICE_CENTS } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionData } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: ANALYSIS_PRICE_CENTS,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        sessionData: JSON.stringify(sessionData),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: ANALYSIS_PRICE_CENTS,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
