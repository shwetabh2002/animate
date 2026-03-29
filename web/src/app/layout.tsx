import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Alubond U.S.A — Fire Retardant Metal Composites",
  description:
    "High-performance ACP and MCM panels for façades, rainscreens, and interiors. Solid, stone, and anodized finishes with global fire certifications.",
  keywords: [
    "Alubond",
    "ACP",
    "metal composite",
    "fire rated cladding",
    "rainscreen",
    "façade",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-white font-sans text-stone-900 antialiased subpixel-antialiased">
        {children}
      </body>
    </html>
  );
}
