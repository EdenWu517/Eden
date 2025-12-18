import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "次世代行動創新應用Demo Day",
  description: "次世代行動創新應用Demo Day",
  icons: {
    icon: [
      { url: "/itri.png", type: "image/png", sizes: "any" },
      { url: "/itri.png", rel: "shortcut icon" },
      { url: "/favicon.ico" }, // fallback
    ],
    apple: [{ url: "/itri.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
