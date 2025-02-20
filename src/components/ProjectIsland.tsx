"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ProjectIslandProps {
  children: React.ReactNode;
}

export default function ProjectIsland({ children }: ProjectIslandProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const translateX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);

  return (
    <>
      <section
        ref={sectionRef}
        className="col-span-full grid grid-cols-subgrid gap-y-[calc(var(--u-grid-gap)*1.5)]"
      >
        {children}
      </section>

      <div className="fixed w-[10vw] h-[4px] bottom-[30px] left-1/2 -translate-x-1/2 rounded-full bg-stone-950/20 dark:bg-white/20 overflow-hidden">
        <motion.div
          style={{ translateX }}
          className="w-full h-full bg-stone-950 dark:bg-white rounded-full"
        />
      </div>
    </>
  );
}
