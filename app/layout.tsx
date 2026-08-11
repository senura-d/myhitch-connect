import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";
import { assetPath } from "@/lib/asset-path";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "MYHitch Connect",
    template: "%s | MYHitch Connect",
  },
  description:
    "MYHitch Connect is a marketplace connecting customers with professional, personal, commercial and community service providers.",
  // Metadata icon hrefs are emitted verbatim — basePath is not applied — so
  // they need the same prefix as the images.
  icons: {
    icon: assetPath("/favicon.ico"),
    apple: assetPath("/apple-icon.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased font-sans ${plusJakarta.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
