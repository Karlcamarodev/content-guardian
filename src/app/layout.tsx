import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
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
    "automated moderation",
    "trust and safety",
    "AI content analysis"
  ],
  
  authors: [
    { name: "Karl Camaro", url: "https://github.com/Karlcamarodev" }
  ],
  
  creator: "Karl Camaro",
  
  openGraph: {
    title: "Content Guardian - AI-Powered Moderation",
    description: "AI-powered content moderation platform with real-time analysis",
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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}