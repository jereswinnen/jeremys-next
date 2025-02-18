"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "motion/react";

interface Props {
  children: React.ReactNode;
}

const AnimationProvider = ({ children }: Props) => {
  const [ready, setReady] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const customEase = cubicBezier(0.645, 0, 0.045, 1);

  useEffect(() => {
    const seenIntro = sessionStorage.getItem("hasSeenIntro");
    setHasSeenIntro(!!seenIntro);
    setReady(true);
  }, []);

  if (!ready) return null;

  if (hasSeenIntro) {
    return (
      <section className="col-span-full grid grid-cols-subgrid gap-y-[calc(var(--u-grid-gap)*1.25)]">
        {children}
      </section>
    );
  }

  return (
    <AnimatePresence>
      <motion.section
        key="first-visit-content"
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.8,
          ease: customEase,
          delay: 5,
        }}
        className="col-span-full grid grid-cols-subgrid gap-y-[calc(var(--u-grid-gap)*1.25)]"
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
};

export default AnimationProvider;
