import type { Metadata } from "next";
import Button from "@/components/Button";
import ProjectListItem from "@/components/ProjectListItem";
import ShaderWrapper from "@/components/ShaderWrapper";
import {
  getProjectHeroImage,
  getProjects,
  sortProjects,
} from "@/lib/projectUtils";

export const metadata: Metadata = {
  title: "Info - Jeremy Swinnen",
};

export default async function Info() {
  const projects = await getProjects();
  const sortedProjects = sortProjects(projects);

  return (
    <>
      <section className="col-span-full grid grid-cols-subgrid !gap-y-6 md:!gap-y-12 min-h-[50vh] content-end">
        <header className="col-span-full md:!col-span-7">
          <h2 className="font-bold text-[clamp(40px,6vw,100px)] -tracking-[0.045em] leading-[1.12em] indent-8 md:indent-32 text-balance">
            I design and build digital experiences for web and
            mobile&mdash;wherever you click or tap.
          </h2>
        </header>
        <div className="col-span-full flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6">
          <Button data-copyEmail={true} href="hey@jeremys.be" label="Email" />
          <Button href="https://threads.net/@jereswinnen" label="Threads" />
          <Button href="https://mstdn.social/@jeremys" label="Mastodon" />
        </div>
      </section>
      <section
        data-speed="1"
        className="col-span-full grid grid-cols-subgrid gap-y-6 md:gap-y-0 pt-6 border-t border-stone-950 dark:border-white/20"
      >
        <aside className="col-span-1 md:!col-start-3 md:!col-span-2 order-3 md:order-1">
          <ShaderWrapper
            sources={[
              {
                srcset: "/images/profileShot.avif",
                type: "image/avif",
              },
              {
                srcset: "/images/profileShot.webp",
                type: "image/webp",
              },
            ]}
            fallbackSrc="/images/profileShot.jpg"
            alt="Hi there!"
          />
        </aside>
        <header className="col-span-full md:!col-start-5 md:!col-span-1 order-1 md:order-2">
          <h3 className="font-medium">Profile</h3>
        </header>
        <article className="col-span-full md:!col-start-6 order-2 md:order-3 text-lg">
          <p>
            With a sharp eye for detail and a hands-on approach, I craft
            interfaces that are both visually striking and highly functional. I
            believe that great design goes beyond surface-level aesthetics—it
            should make users feel understood and create an experience
            that&rsquo;s both intuitive and delightful. From concept to code, I
            bring ideas to life with precision and purpose, ensuring every
            element serves a function while contributing to the overall user
            experience.
          </p>
          <p>
            I&rsquo;ve worked with individuals and small teams in tech and real
            estate, delivering designs that don&rsquo;t just look good—they work
            effortlessly. Whether it&rsquo;s designing a seamless, user-friendly
            mobile app or refining a brand&rsquo;s online presence, I&rsquo;m
            dedicated to making sure every project I work on improves the user
            experience and adds real value to the target audience. I take a
            holistic approach to design, considering not only how things look
            but how they function across devices and platforms. From prototyping
            to the final lines of code, I focus on creating responsive,
            reliable, and easy-to-navigate solutions.
          </p>
          <p>
            Whether it&rsquo;s breathing new life into a digital presence or
            building a fully responsive website from the ground up, I thrive on
            blending aesthetics with practicality. I work closely with clients
            to ensure their vision is fully realized while also making sure the
            end product is easy to maintain, scalable, and adaptable to future
            needs.
          </p>
        </article>
      </section>
      <section className="col-span-full grid grid-cols-subgrid gap-y-6 md:gap-y-0 pt-6 border-t border-stone-950 dark:border-white/20">
        <header className="col-span-full md:!col-start-5 md:!col-span-1">
          <h3 className="font-medium">Skills</h3>
        </header>
        <div className="col-span-full md:!col-start-6">
          <ul className="flex flex-col gap-6 [&>li]:flex [&>li]:flex-col [&>li>h3]:text-2xl [&>li>p]:opacity-70 text-base">
            <li>
              <h3>User Experience Design</h3>
              <p>
                Focusing on usability, accessibility, and user needs to create
                seamless interactions.
              </p>
            </li>
            <li>
              <h3>User Interface Design</h3>
              <p>
                Designing clear, functional, and visually cohesive interfaces
                for digital products.
              </p>
            </li>
            <li>
              <h3>Website Design</h3>
              <p>
                Structuring layouts, typography, and content to create
                well-organized web experiences.
              </p>
            </li>
            <li>
              <h3>Front-end Web Development</h3>
              <p>
                Translating designs into responsive, maintainable, and efficient
                code for the web.
              </p>
            </li>
            <li>
              <h3>iOS App Development</h3>
              <p>
                Building native iOS applications with a focus on performance and
                platform guidelines.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="col-span-full grid grid-cols-subgrid gap-y-6 md:gap-y-0 pt-6 border-t border-stone-950 dark:border-white/20">
        <header className="col-span-full">
          <h3 className="font-medium">Work experience</h3>
        </header>
        <ul className="col-span-full grid grid-cols-subgrid !gap-y-0 text-lg">
          {sortedProjects.map(async (project) => {
            let heroImage;
            if (project.data.heroArtwork) {
              try {
                heroImage = await getProjectHeroImage(
                  project.data.name,
                  project.data.heroArtwork
                );
              } catch (error) {
                console.error(
                  `Failed to load hero image for ${project.data.name}:`,
                  error
                );
              }
            }

            return (
              <ProjectListItem
                key={project.data.name}
                project={project}
                heroImage={heroImage}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}
