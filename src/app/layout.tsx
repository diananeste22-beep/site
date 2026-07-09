import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://arseniy.design"),
  title: {
    default: "Арсений - графический дизайн",
    template: "%s | Арсений",
  },
  description:
    "Сайт-портфолио графического дизайнера Арсения: коммерческий маркетинг, полиграфия, обложки, постеры и музыкальный креатив.",
  keywords: [
    "графический дизайнер",
    "Арсений дизайнер",
    "портфолио дизайнера",
    "баннеры",
    "полиграфия",
    "обложки релизов",
    "постеры",
  ],
  authors: [{ name: "Арсений" }],
  creator: "Арсений",
  openGraph: {
    title: "Арсений - графический дизайн",
    description:
      "Коммерческий маркетинг и музыкальный креатив: баннеры, полиграфия, обложки, постеры и визуальные системы.",
    url: "https://arseniy.design",
    siteName: "Арсений - портфолио дизайнера",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Портфолио графического дизайнера Арсения",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Арсений - графический дизайн",
    description: "Коммерческий маркетинг и музыкальный креатив в одном портфолио.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f1f8ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
