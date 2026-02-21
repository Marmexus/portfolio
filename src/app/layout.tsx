import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nattapong Nantasang — Full Stack Engineer",
  description:
    "Full Stack Engineer specializing in ERP and WMS systems. Building high-throughput enterprise solutions with NestJS, Next.js, and PostgreSQL.",
  keywords: [
    "Full Stack Engineer",
    "NestJS",
    "Next.js",
    "PostgreSQL",
    "ERP",
    "WMS",
    "TypeScript",
    "Bangkok",
  ],
  authors: [{ name: "Nattapong Nantasang" }],
  openGraph: {
    title: "Nattapong Nantasang — Full Stack Engineer",
    description:
      "Bridging complex business logic with seamless user experiences. Specializing in high-throughput enterprise solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nattapong Nantasang — Full Stack Engineer",
    description:
      "Bridging complex business logic with seamless user experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <CustomCursor />
        {/* <GoogleAnalytics gaId=""/> */}
        {children}
      </body>
    </html>
  );
}
