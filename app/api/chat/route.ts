import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, aiParams } = await req.json();

    // Build the prompt text from messages
    let promptText = messages
      .map((m: any) => (m.user ? `User: ${m.text}` : `AI: ${m.text}`))
      .join("\n");
    promptText += "\nAI:";

    // Gemini 2 API request body
    const body = {
      contents: [
        {
          parts: [
            {
              text: promptText
            }
          ]
        }
      ],
      temperature: aiParams?.temperature ?? 1,
      maxOutputTokens: aiParams?.maxTokens ?? 150
    };

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": "AIzaSyD0fgC5_Sf_5cC_hS_KMtYmRQFxKaz2mAM"
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    // Extract AI-generated text
    let text = "[Error generating response]";
    if (data?.contents?.length > 0) {
      const content = data.contents[0];
      if (content?.parts?.length > 0) {
        text = content.parts.map((p: any) => p.text || "").join("");
      }
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ text: "[Error generating response]" });
  }
}
