import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ascendiq.ai"),
  title: {
    default: "AscendIQ — ISO 27001 compliance automation, powered by LLMs",
    template: "%s · AscendIQ",
  },
  description:
    "AscendIQ generates your ISO 27001 policies, collects evidence from AWS, GitHub and Jira automatically, and keeps you audit-ready with continuous drift detection. Go from 6–12 months to 4–8 weeks.",
  openGraph: {
    title: "AscendIQ — ISO 27001 compliance in weeks, not months",
    description:
      "LLM-powered policy generation, 80%+ automated evidence collection, real-time compliance posture.",
    type: "website",
    siteName: "AscendIQ",
  },
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192" }, { url: "/icon-512.png", sizes: "512x512" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
