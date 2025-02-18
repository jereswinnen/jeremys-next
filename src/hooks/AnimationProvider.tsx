"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowPage(true);
    } else {
      setShowPage(true);
    }
  }, []);

  return (
    <AnimatePresence>
      {showPage && (
        <motion.section
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            ease: [0.645, 0, 0.045, 1],
            delay: 5,
          }}
          className="col-span-full grid grid-cols-subgrid gap-y-[calc(var(--u-grid-gap)*1.25)]"
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default AnimationProvider;
