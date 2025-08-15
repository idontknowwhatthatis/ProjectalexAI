import { NextRequest } from "next/server";

export const runtime = "nodejs"; // Vercel Node runtime

// Minimal adapter from our UI messages to Gemini's expected payload
function toGeminiContents(messages: { role: string; content: string }[]) {
  return messages.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }]
  }));
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!process.env.GOOGLE_API_KEY) {
      return new Response(JSON.stringify({ error: "GOOGLE_API_KEY not set" }), { status: 500 });
    }

    const body = {
      contents: toGeminiContents(messages || []),
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    };

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GOOGLE_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: text }), { status: 500 });
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") || "(No response)";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({
