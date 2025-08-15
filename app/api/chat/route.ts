import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, temperature, style, maxTokens } = await req.json();

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer AIzaSyD0fgC5_Sf_5cC_hS_KMtYmRQFxKaz2mAM`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: {
            text: style === "funny"
              ? `Answer in a funny way: ${prompt}`
              : style === "formal"
              ? `Answer in a formal tone: ${prompt}`
              : prompt,
          },
          temperature,
          maxOutputTokens: maxTokens,
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.[0]?.text || "[No response]";
    return NextResponse.json({ text });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ text: "[Error fetching AI response]" });
  }
}
