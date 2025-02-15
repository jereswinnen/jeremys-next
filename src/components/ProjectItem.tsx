import { FC } from "react";
import Image from "next/image";
import { getProjectImage, type ProjectData } from "@/utils/projectUtils";

interface ProjectItemProps {
  project: ProjectData;
}

const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
  return (
    <section className="col-span-full grid grid-cols-subgrid !gap-[calc(var(--u-grid-gap)/2)] pt-6 border-t border-stone-900 dark:border-white/20">
      <header className="col-span-full grid grid-cols-subgrid text-sm divide-y divide-stone-900/20 dark:divide-white/20 md:divide-none [&>*]:flex [&>*]:flex-col [&>*]:gap-1 [&>*]:py-4 [&>*]:md:py-0 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0 [&>*>*:first-child]:mb-0 [&>*>*:first-child]:opacity-70 [&>*>*:last-child]:font-medium">
        <div>
          <p>Name</p>
          <p>{project.name}</p>
        </div>
        <div className="col-span-2">
          <p>Info</p>
          <p className="!font-normal text-base">{project.description}</p>
        </div>
        <div className="col-span-full md:!col-span-2 md:!col-start-6">
          <p>Role</p>
          <p>{project.role}</p>
        </div>
        <div className="col-span-full md:!col-span-1 md:!col-start-8">
          <p>Timeframe</p>
          <div className="flex gap-1">
            <span>{project.startDate}</span>
            <span className="font-[system-ui,sans-serif] font-normal opacity-50">
              →
            </span>
            <span>{project.endDate}</span>
          </div>
        </div>
      </header>

      <div className="col-span-full grid grid-cols-subgrid !gap-[calc(var(--u-grid-gap)/5)]">
        {project.artwork.map(async (item, index) => {
          const imagePath = await getProjectImage(project.name, item.src);
          return (
            <figure
              key={index}
              className={`flex flex-col justify-center items-center p-8 md:p-12 bg-stone-50 dark:bg-stone-900/50
                ${item.colSpan ? `col-span-${item.colSpan}` : ""}
                ${item.mdColSpan ? `md:col-span-${item.mdColSpan}` : ""}
                ${item.lgColSpan ? `lg:col-span-${item.lgColSpan}` : ""}`}
            >
              <Image
                src={imagePath}
                alt={item.caption || project.name}
                width={1000}
                height={1000}
                className="relative max-h-[60vh] lg:max-h-[40vh] object-contain"
                loading="lazy"
              />
              {/* <img
                className="max-h-[60vh] lg:max-h-[40vh] object-contain"
                loading="lazy"
                src={imagePath}
                alt={item.caption || project.name}
              /> */}
              {item.caption && (
                <figcaption className="text-sm font-medium text-center opacity-60">
                  <p>{item.caption}</p>
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectItem;
