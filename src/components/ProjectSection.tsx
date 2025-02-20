"use client";
import { useRef } from "react";
import { cubicBezier, motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";

interface ProjectSectionProps {
  children: React.ReactNode;
}

export default function ProjectSection({ children }: ProjectSectionProps) {
  const customEase = cubicBezier(0.645, 0, 0.045, 1);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const translateX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const scrollerWidth = useTransform(
    scrollYProgress,
    [0, 0.03, 0.97, 1],
    ["0vw", "6vw", "6vw", "0vw"],
    { ease: customEase }
  );
  const scrollerOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.97, 1],
    [0, 1, 1, 0],
    { ease: customEase }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="col-span-full grid grid-cols-subgrid gap-y-[calc(var(--u-grid-gap)*1.5)]"
      >
        {children}
      </section>

      <motion.div
        data-scroller
        initial={{ width: "0vw", opacity: 0 }}
        style={{
          width: scrollerWidth,
          opacity: scrollerOpacity,
        }}
        className="fixed h-[4px] bottom-[30px] left-1/2 -translate-x-1/2 rounded-full bg-stone-950/20 dark:bg-white/20 overflow-hidden"
      >
        <motion.div
          data-scroller-track
          style={{ translateX }}
          className="w-full h-full bg-stone-950 dark:bg-white rounded-full"
        />
      </motion.div>
    </>
  );
}
