import type { Metadata } from "next";
import localFont from "next/font/local";
import { portfolio } from "@/data/portfolio";
import Header from "@/components/Header";
import { themeInitScript } from "@/components/theme";
import { siteUrl, withBasePath } from "@/lib/site";
import "./globals.css";

const editorial = localFont({
  src: [
    { path: "../public/fonts/instrument-serif-latin-400-normal.woff2", style: "normal" },
    { path: "../public/fonts/instrument-serif-latin-400-italic.woff2", style: "italic" },
  ], variable: "--font-editorial", display: "swap",
});
const sans = localFont({
  src: [
    { path: "../public/fonts/dm-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../public/fonts/dm-sans-latin-500-normal.woff2", weight: "500" },
    { path: "../public/fonts/dm-sans-latin-600-normal.woff2", weight: "600" },
  ], variable: "--font-sans", display: "swap",
});

const { profile } = portfolio;
const title = `${profile.name} — Personal Field Journal`;
const description = `A personal portfolio and interactive nature journal by ${profile.name}, ${profile.role} at ${profile.institution}.`;
export const metadata: Metadata = {
  metadataBase: siteUrl, title: { default: title, template: `%s · ${profile.name}` }, description,
  alternates: { canonical: siteUrl.toString() },
  icons: { icon: withBasePath("/sprout.svg") },
  openGraph: { title, description, type: "website", url: siteUrl.toString(), images: [{ url: new URL("images/hero.webp", siteUrl).href, alt: "A study of forest greenery" }] },
  twitter: { card: "summary_large_image", title, description, images: [new URL("images/hero.webp", siteUrl).href] },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" suppressHydrationWarning className={`${editorial.variable} ${sans.variable}`}>
    <head><script dangerouslySetInnerHTML={{__html: themeInitScript}} /></head>
    <body><a className="skip-link" href="#main">Skip to content</a><Header name={profile.name}/>{children}</body>
  </html>;
}
