import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/toast";
import { ScrollToTop } from "@/components/scroll-to-top";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Frontend Learning Hub",
    template: "%s — Frontend Learning Hub",
  },
  description:
    "Учебный сайт по frontend-разработке. Статьи, темы и руководства по HTML, CSS, JavaScript, TypeScript, React и Next.js.",
  keywords: ["frontend", "React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  authors: [{ name: "Frontend Learning Hub" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Frontend Learning Hub",
    title: "Frontend Learning Hub",
    description:
      "Учебный сайт по frontend-разработке. Статьи, темы и руководства по HTML, CSS, JavaScript, TypeScript, React и Next.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend Learning Hub",
    description:
      "Учебный сайт по frontend-разработке. Статьи и руководства по HTML, CSS, JavaScript, TypeScript, React и Next.js.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
