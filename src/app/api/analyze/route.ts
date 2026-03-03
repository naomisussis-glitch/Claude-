import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { anthropic } from "@/lib/claude";
import { KIBBE_PROFILES, KIBBE_SYSTEM_PROMPT, type KibbeType } from "@/lib/kibbe";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const paymentIntentId = formData.get("paymentIntentId") as string;
    const imageFile = formData.get("image") as File | null;
    const height = formData.get("height") as string;
    const weight = formData.get("weight") as string;
    const gender = formData.get("gender") as string;
    const age = formData.get("age") as string;
    const additionalNotes = formData.get("additionalNotes") as string;
    const shoulderType = formData.get("shoulderType") as string;
    const hipType = formData.get("hipType") as string;

    // Verify payment was successful
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    // Build the analysis prompt
    const userDetails = `
User Details:
- Height: ${height}
- Weight: ${weight}
- Gender identity: ${gender}
- Age: ${age}
- Shoulder type (self-reported): ${shoulderType}
- Hip type (self-reported): ${hipType}
- Additional notes: ${additionalNotes || "None provided"}
`;

    const analysisPrompt = `${userDetails}

Please analyze this person's body type using the Kibbe system. Consider:
1. Their measurements and proportions
2. The photo provided (if available)
3. Their self-reported details about shoulder and hip structure

Respond with a JSON object in this exact format:
{
  "kibbeType": "<one of the 13 Kibbe types>",
  "confidence": "<High/Medium/Low>",
  "reasoning": "<2-3 sentences explaining why this type fits>",
  "keyFeatures": ["<feature 1>", "<feature 2>", "<feature 3>"],
  "additionalStyleTips": "<2-3 personalized tips based on their specific details>"
}

The 13 valid Kibbe types are: Dramatic, Soft Dramatic, Natural, Flamboyant Natural, Soft Natural, Classic, Soft Classic, Dramatic Classic, Gamine, Flamboyant Gamine, Soft Gamine, Romantic, Theatrical Romantic.

Return ONLY the JSON object, no other text.`;

    let analysisResult;

    if (imageFile && imageFile.size > 0) {
      // Convert image to base64 for Claude vision
      const imageBuffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      const mediaType = imageFile.type as "image/jpeg" | "image/png" | "image/gif" | "image/webp";

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: KIBBE_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: base64Image,
                },
              },
              {
                type: "text",
                text: analysisPrompt,
              },
            ],
          },
        ],
      });

      const textContent = message.content.find((c) => c.type === "text");
      analysisResult = JSON.parse(textContent?.text || "{}");
    } else {
      // Text-only analysis based on measurements
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: KIBBE_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: analysisPrompt,
          },
        ],
      });

      const textContent = message.content.find((c) => c.type === "text");
      analysisResult = JSON.parse(textContent?.text || "{}");
    }

    const kibbeType = analysisResult.kibbeType as KibbeType;
    const profile = KIBBE_PROFILES[kibbeType];

    if (!profile) {
      throw new Error(`Unknown Kibbe type: ${kibbeType}`);
    }

    return NextResponse.json({
      success: true,
      kibbeType,
      confidence: analysisResult.confidence,
      reasoning: analysisResult.reasoning,
      keyFeatures: analysisResult.keyFeatures,
      additionalStyleTips: analysisResult.additionalStyleTips,
      profile: {
        description: profile.description,
        doWear: profile.doWear,
        avoid: profile.avoid,
        keyPieces: profile.keyPieces,
        silhouettes: profile.silhouettes,
        fabricRecommendations: profile.fabricRecommendations,
        colorGuidance: profile.colorGuidance,
        pricePoints: profile.pricePoints,
        celebrities: profile.celebrities,
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
