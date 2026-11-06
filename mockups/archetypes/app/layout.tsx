import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prop Desk · Three design archetypes",
  description: "Mockup: three layouts for propdesknews.com built on live deal and rule data. Not the live site.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#09090b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-bg text-fg">{children}</body>
    </html>
  );
}
