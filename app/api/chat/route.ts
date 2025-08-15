import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, aiParams } = body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer $AIzaSyD0fgC5_Sf_5cC_hS_KMtYmRQFxKaz2mAM`, // store your API key in .env.local
        },
        body: JSON.stringify({
          prompt: message,
          temperature: aiParams.temperature,
          maxOutputTokens: aiParams.maxTokens,
          candidateCount: 1,
        }),
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.[0]?.text || "[No response]";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "[Error generating response]" }, { status: 500 });
  }
}
