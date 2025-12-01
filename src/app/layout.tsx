import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://content-guardian-five.vercel.app'),
  
  title: {
    default: "Content Guardian - AI-Powered Moderation",
    template: "%s | Content Guardian"
  },
  
  description: "AI-powered content moderation platform with real-time analysis, sentiment detection, and automated workflows. Built by Karl Camaro.",
  
  keywords: [
    "content moderation",
    "AI moderation",
    "sentiment analysis",
    "content filtering",
    "automated moderation"
  ],
  
  authors: [{ name: "Karl Camaro", url: "https://github.com/Karlcamarodev" }],
  creator: "Karl Camaro",
  
  openGraph: {
    title: "Content Guardian - AI-Powered Moderation",
    description: "AI-powered content moderation platform",
    url: "https://content-guardian-five.vercel.app",
    siteName: "Content Guardian",
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: "Content Guardian",
    description: "AI-powered content moderation platform",
    creator: '@karlcamaro1',
  },
  
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}