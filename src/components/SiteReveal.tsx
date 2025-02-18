"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimate, cubicBezier } from "motion/react";
import Image from "next/image";

const SiteReveal = () => {
  const [scope, animate] = useAnimate();
  const [showOverlay, setShowOverlay] = useState(true);

  const timeline = {
    initial: 0.3,
    profileShot: {
      duration: 1.15,
      delay: 0,
    },
    leftRight: {
      duration: 0.7,
      delay: 0.05,
      stagger: 0.1,
    },
    directional: {
      duration: 0.7,
      delay: 0.01,
      stagger: 0.1,
    },
    overlay: {
      duration: 1.5,
      delay: 0.6,
    },
  };

  const customEase = cubicBezier(0.645, 0, 0.045, 1);

  useEffect(() => {
    if (showOverlay) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "";
    }

    return () => {
      document.body.style.position = "";
    };
  }, [showOverlay]);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowOverlay(false);
      return;
    }

    const sequence = async () => {
      try {
        // Ensure main section is visible
        await animate(
          scope.current,
          { opacity: 1 },
          { duration: 0.3, ease: customEase }
        );

        // Profile shot animation
        await animate(
          "figure[data-profileshot]",
          {
            clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
            scale: [1.05, 1],
            opacity: [0, 1],
          },
          {
            duration: timeline.profileShot.duration,
            ease: customEase,
            delay: timeline.initial,
          }
        );

        // Left/Right animations
        await Promise.all([
          animate(
            "span[data-blurfadeinleft]",
            {
              x: ["20px", 0],
              opacity: [0, 1],
              filter: ["blur(10px)", "blur(0px)"],
            },
            {
              duration: timeline.leftRight.duration,
              ease: customEase,
              delay: timeline.leftRight.delay,
            }
          ),
          animate(
            "span[data-blurfadeinright]",
            {
              x: ["-20px", 0],
              opacity: [0, 0.7],
              filter: ["blur(10px)", "blur(0px)"],
            },
            {
              duration: timeline.leftRight.duration,
              ease: customEase,
              delay: timeline.leftRight.delay + timeline.leftRight.stagger,
            }
          ),
        ]);

        // Directional animations
        const directions = [
          {
            selector: "figure[data-blurfadetopleft]",
            initial: { x: -50, y: -50 },
          },
          { selector: "figure[data-blurfadetop]", initial: { x: 0, y: -50 } },
          { selector: "figure[data-blurfadebottom]", initial: { x: 0, y: 50 } },
          {
            selector: "figure[data-blurfadebottomright]",
            initial: { x: 50, y: 50 },
          },
        ];

        await Promise.all(
          directions.map((dir, i) =>
            animate(
              dir.selector,
              {
                x: [dir.initial.x, 0],
                y: [dir.initial.y, 0],
                opacity: [0, 1],
                filter: ["blur(10px)", "blur(0px)"],
                rotate: [0, Math.random() * 6 - 3],
              },
              {
                duration: timeline.directional.duration,
                ease: customEase,
                delay:
                  timeline.directional.delay + i * timeline.directional.stagger,
              }
            )
          )
        );

        // Final animations - clip overlay and fade out all elements
        await Promise.all([
          animate(
            scope.current,
            {
              display: "none",
              clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
              pointerEvents: "none",
            },
            {
              duration: timeline.overlay.duration,
              ease: customEase,
              delay: timeline.overlay.delay,
            }
          ),
          animate(
            "figure[data-profileshot], span[data-blurfadeinleft], span[data-blurfadeinright], figure[data-blurfadetopleft], figure[data-blurfadetop], figure[data-blurfadebottom], figure[data-blurfadebottomright]",
            {
              opacity: 0,
              y: -50,
              scale: 0.95,
            },
            {
              duration: timeline.overlay.duration,
              ease: customEase,
              delay: timeline.overlay.delay + timeline.overlay.duration * 0.1,
            }
          ),
        ]);

        sessionStorage.setItem("hasSeenIntro", "true");
        setShowOverlay(false);
      } catch (error) {
        console.error("Animation error:", error);
      }
    };

    sequence();
  }, [animate, scope]);

  return (
    <AnimatePresence mode="wait">
      {showOverlay && (
        <section
          ref={scope}
          className="fixed inset-0 z-1000 grid w-screen min-h-screen text-white bg-stone-950 dark:text-stone-950 dark:bg-white overflow-hidden [&>figure]:not-[&:nth-child(3)]:absolute [&>figure]:m-0 [&>figure]:p-0"
          style={{
            opacity: 0,
            WebkitClipPath: "inset(0% 0% 0% 0%)",
            clipPath: "inset(0% 0% 0% 0%)",
          }}
          data-overlay
        >
          <motion.figure
            className="hidden md:block w-[60vh] -top-[10%] -left-[120px]"
            data-blurfadetopleft
            initial={{ opacity: 0 }}
          >
            <Image
              src="/images/work/realo/TabletLandscapeSearch.png"
              alt="Realo tablet view"
              width={800}
              height={600}
              className="relative"
            />
          </motion.figure>

          <motion.figure
            className="hidden md:block w-[30vh] -top-[20%] right-[8%]"
            data-blurfadetop
            initial={{ opacity: 0 }}
          >
            <Image
              src="/images/work/gamepal/PhoneJournal.png"
              alt="GamePal journal view"
              width={600}
              height={800}
              className="relative"
            />
          </motion.figure>

          <div className="grid grid-cols-[auto_70vw_auto] md:grid-cols-[auto_15vw_auto] gap-2 place-content-center [&>*]:flex [&>*]:text-sm [&>*]:[writing-mode:vertical-lr]">
            <motion.span
              className="items-end justify-end font-medium"
              data-blurfadeinleft
              initial={{ opacity: 0 }}
            >
              Jeremy Swinnen
            </motion.span>

            <motion.figure
              data-profileshot
              className="relative max-h-[45vh] md:max-h-auto items-center"
              initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
            >
              <Image
                src="/images/profileShot.webp"
                alt="Profile photo"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </motion.figure>

            <motion.span
              className="items-start opacity-70"
              data-blurfadeinright
              initial={{ opacity: 0 }}
            >
              UX/UI Designer & Creative Developer
            </motion.span>
          </div>

          <motion.figure
            className="hidden md:block w-[30vh] -bottom-[10%] left-[8%]"
            data-blurfadebottom
            initial={{ opacity: 0 }}
          >
            <Image
              src="/images/work/gamepal/PhoneYearInPlayStart.png"
              alt="GamePal year in play"
              width={600}
              height={800}
              className="relative"
            />
          </motion.figure>

          <motion.figure
            className="hidden md:block w-[60vh] -bottom-[10%] -right-[120px]"
            data-blurfadebottomright
            initial={{ opacity: 0 }}
          >
            <Image
              src="/images/work/scorecard/TabletGameSessionsDark.png"
              alt="Scorecard tablet view"
              width={800}
              height={600}
              className="relative"
            />
          </motion.figure>
        </section>
      )}
    </AnimatePresence>
  );
};

export default SiteReveal;
