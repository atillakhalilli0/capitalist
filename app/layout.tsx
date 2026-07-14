import type { Metadata, Viewport } from "next";
import { Montserrat, Lora, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import ThemeProvider from "@/providers/ThemeProvider";

const fontSans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontSerif = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://capitalist.az"),

  title: {
    default: "Capitalist",
    template: "%s | Capitalist",
  },

  description:
    "Business, Economy, Finance, Startups, Technology and Analytics Media Platform.",

  applicationName: "Capitalist",

  keywords: [
    "Business",
    "Economy",
    "Finance",
    "Startup",
    "Marketing",
    "Technology",
    "Azerbaijan",
  ],

  authors: [
    {
      name: "Capitalist Editorial Team",
    },
  ],

  creator: "Capitalist",

  publisher: "Capitalist",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "az_AZ",
    siteName: "Capitalist",
    title: "Capitalist",
    description:
      "Business & Economy Media Platform",
  },

  twitter: {
    card: "summary_large_image",
    title: "Capitalist",
    description:
      "Business & Economy Media Platform",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#09090b",
    },
  ],
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body
        className={`
          ${fontSans.variable}
          ${fontSerif.variable}
          ${fontMono.variable}
          min-h-screen
          bg-background
          font-sans
          text-foreground
          antialiased
        `}
      >
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}