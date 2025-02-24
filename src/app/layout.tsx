import "./globals.scss";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Bricolage_Grotesque } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import LenisProvider from "@/hooks/LenisProvider";
import AnimationProvider from "@/hooks/AnimationProvider";
import SiteReveal from "@/components/SiteReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactLenis from "lenis/react";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});

export const metadata: Metadata = {
  title: "Jeremy Swinnen",
  description: "A designer and developer from Belgium",
  openGraph: {
    title: "Jeremy Swinnen",
    description: "A designer and developer from Belgium",
    url: "https://jeremys.be",
    type: "website",
    images: [
      {
        url: "https://jeremys.be/images/shareCover.png",
        width: 1200,
        height: 630,
        alt: "Jeremy Swinnen is a designer and developer from Belgium",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="scroll-smooth bg-black">
        <body
          className={`${bricolageGrotesque.variable} o-grid !gap-y-0 text-stone-900 dark:text-white antialiased selection:bg-ocean-light selection:text-ocean-dark dark:selection:bg-ocean-dark dark:selection:text-ocean-light`}
        >
          <ReactLenis root>
            <Analytics />
            <SiteReveal />
            {/* <LenisProvider /> */}
            <AnimationProvider>
              <section className="px-container-sm md:px-container-md col-span-full grid grid-cols-subgrid gap-y-[calc(var(--u-grid-gap)*1.25)] bg-white dark:bg-stone-950">
                <Header className="col-span-full md:sticky md:top-0" />
                <main className="col-span-full grid grid-cols-subgrid gap-y-[calc(var(--u-grid-gap)*1.25)]">
                  {children}
                </main>
                <Footer className="col-span-full" />
              </section>
            </AnimationProvider>
          </ReactLenis>
        </body>
      </html>
    </ViewTransitions>
  );
}
