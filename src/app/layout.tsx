import "./globals.scss";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import LenisProvider from "@/hooks/LenisProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${bricolageGrotesque.variable} o-container o-grid text-stone-900 dark:text-white bg-white dark:bg-stone-950 antialiased`}
        >
          <LenisProvider />
          <Header className="col-span-full md:sticky md:top-0" />
          <main className="col-span-full grid grid-cols-subgrid">
            {children}
          </main>
          <Footer className="col-span-full" />
        </body>
      </html>
    </ViewTransitions>
  );
}
