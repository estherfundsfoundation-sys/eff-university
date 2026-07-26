import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import LaunchSafety from "./LaunchSafety";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "eff-university.local";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);
  const title = "EFF University | Experience College Before You Enroll";
  const description = "Choose an HBCU-inspired or contemporary fictional campus, explore 50+ majors, select housing, join organizations, decode financial aid, and attend a simulated graduation.";

  return {
    metadataBase: base,
    title,
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: new URL("/og.png", base).toString(), width: 1536, height: 1024, alt: "EFF University virtual college experience" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LaunchSafety>{children}</LaunchSafety></body></html>;
}
