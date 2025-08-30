import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "SoftEdge - Coffee Shop Demo",
  description:
    "Premium coffee experience that surpasses expectations. Discover our luxury coffee blends and exceptional service.",
  generator: "v0.app",
  keywords: "premium coffee, luxury coffee shop, artisan coffee, coffee blends, Best Brew, specialty coffee",
  authors: [{ name: "Best Brew Team" }],
  creator: "Best Brew",
  publisher: "Best Brew",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bestbrew.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Brew - Brewed to Perfection, Served with Elegance",
    description:
      "Premium coffee experience that surpasses expectations. Discover our luxury coffee blends and exceptional service.",
    url: "https://bestbrew.com",
    siteName: "Best Brew",
    images: [
      {
        url: "/luxury-coffee-shop.png",
        width: 1200,
        height: 630,
        alt: "Best Brew - Premium Coffee Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Brew - Brewed to Perfection, Served with Elegance",
    description:
      "Premium coffee experience that surpasses expectations. Discover our luxury coffee blends and exceptional service.",
    images: ["/luxury-coffee-shop.png"],
    creator: "@bestbrew",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#DAB49D" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#CDAA7D" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Best Brew" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="preload"
          href="/_next/static/media/space-grotesk-latin-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/dm-sans-latin-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-heading: ${spaceGrotesk.variable};
  --font-body: ${dmSans.variable};
}
        `}</style>
      </head>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus-ring"
        >
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  )
}
