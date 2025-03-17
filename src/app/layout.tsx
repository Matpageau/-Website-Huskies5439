import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

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

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <Navbar></Navbar>
        <div className="main-container">
          {children}
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}