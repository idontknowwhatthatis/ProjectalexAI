import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, aiParams } = await req.json();

    // Build Gemini 2 request
    const body = {
      prompt: messages.map((m: any) => `${m.user ? "User: " : "AI: "}${m.text}`).join("\n") + "\nAI:",
      temperature: aiParams?.temperature ?? 1,
      maxOutputTokens: aiParams?.maxTokens ?? 150,
      candidateCount: 1,
      topK: 40,
      topP: 0.95,
    };

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer AIzaSyD0fgC5_Sf_5cC_hS_KMtYmRQFxKaz2mAM",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    // Extract the text safely
    const text =
      data?.candidates?.[0]?.content
        ?.map((c: any) => c?.text || "")
        .join("") || "[Error generating response]";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ text: "[Error generating response]" });
  }
}
