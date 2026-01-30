import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ops-OS | The Modern Project Management OS",
    template: "%s | Ops-OS"
  },
  description: "A high-performance project management tool designed for speed and clarity. Streamline your workflows, track tasks, and ship faster.",
  keywords: ["project management", "SaaS", "workflow automation", "ops-os", "task tracking", "developer tools"],
  authors: [{ name: "Daksh" }],
  icons: {
    icon: "/crmlogo.png", // Using your logo from the public folder
    shortcut: "/crmlogo.png",
    apple: "/crmlogo.png",
  },
  openGraph: {
    title: "Ops-OS | The Modern Project Management OS",
    description: "Build and ship faster with the ops-os project management toolkit.",
    url: "https://ops-os.vercel.app",
    siteName: "Ops-OS",
    images: [
      {
        url: "/crmlogo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ops-OS | Project Management OS",
    description: "High-performance project management for modern teams.",
    images: ["/crmlogo.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}