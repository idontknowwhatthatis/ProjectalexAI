import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProjectAlex AI",
  description: "A sleek Gemini 2.5 Flash chat client",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
