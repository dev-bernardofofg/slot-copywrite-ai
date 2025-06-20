import { Providers } from "@/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syneFont = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CopyAI",
  description: "CopyAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syneFont.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
