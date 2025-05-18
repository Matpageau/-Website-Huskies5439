/* eslint-disable @typescript-eslint/no-unused-vars */
// root-layout.tsx
import "./globals.css";
import { cookies } from "next/headers"; // Import cookies for SSR
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Base/Navbar/Navbar";
import Footer from "../components/Base/Footer/Footer";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Huskies 5439",
};

type RootLayoutProps = {
  children: ReactNode;
};


const getInitialTheme = async () => {
  const cookieStore = cookies();
  const themeCookie = (await cookieStore).get("theme");
  return themeCookie?.value === "dark" ? "dark" : "light";
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const initialTheme = await getInitialTheme();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable}`} data-theme={initialTheme}>
        <Navbar/>
        <div className="main-container">
          {children}
        </div>
        <Footer/>
      </body>
    <Analytics />
    <SpeedInsights />
    </html>
  );
}