"use client";
import { motion } from "motion/react";
import { useState } from "react";

interface ProjectData {
  name: string;
  startDate: string;
  endDate: string;
  role: string;
  heroArtwork?: string;
}

interface ProjectListItemProps {
  project: {
    data: ProjectData;
  };
  heroImage?: string;
}

const ProjectListItem = ({ project, heroImage }: ProjectListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const customEase = [0.645, 0, 0.045, 1];

  return (
    <li
      className="col-span-full grid grid-cols-subgrid pt-6 pb-5 gap-y-6 md:gap-y-0 items-end border-b last:border-0 border-stone-900/20 dark:border-white/20 transition-all ease-in-out duration-300 hover:border-stone-900/100 dark:hover:border-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <aside className="col-span-2 flex flex-col gap-5">
        {heroImage && (
          <motion.figure
            className="overflow-hidden bg-stone-100 dark:bg-stone-900"
            initial={{ height: 0 }}
            animate={{
              height: isHovered ? "auto" : 0,
            }}
            transition={{
              duration: 0.9,
              ease: customEase,
            }}
          >
            <motion.img
              className="object-contain w-full"
              src={heroImage}
              alt={`${project.data.name} artwork`}
              initial={{ scale: 1.08 }}
              animate={{
                scale: isHovered ? 1 : 1.08,
              }}
              transition={{
                duration: 0.9,
                ease: customEase,
              }}
            />
          </motion.figure>
        )}
        <div className="flex flex-col">
          <div className="flex gap-1 text-sm opacity-60">
            <span>{project.data.startDate}</span>
            <span className="font-[system-ui,sans-serif] !font-normal">
              &rarr;
            </span>
            <span>{project.data.endDate}</span>
          </div>
          <p className="text-2xl">{project.data.name}</p>
        </div>
      </aside>
      <article className="col-span-full md:!col-start-6 text-base">
        <p>{project.data.role}</p>
      </article>
    </li>
  );
};

export default ProjectListItem;
