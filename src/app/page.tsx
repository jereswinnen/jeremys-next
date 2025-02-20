import { getProjects, sortProjects } from "@/lib/projectUtils";
import ProjectItem from "@/components/ProjectItem";
import ShaderWrapper from "@/components/ShaderWrapper";
import ProjectSection from "@/components/ProjectSection";

export default async function Home() {
  const projects = await getProjects();
  const sortedProjects = sortProjects(projects, {
    exclude: ["digipolis", "koopr", "opensesame", "planticus", "yally"],
  });

  return (
    <>
      <header className="col-span-full grid grid-cols-subgrid place-content-end items-center h-[40vh]">
        <figure className="w-[60px] md:w-[80px] rounded-full overflow-clip">
          <ShaderWrapper
            hover={false}
            sources={[
              {
                srcset: "/images/decoImage.avif",
                type: "image/avif",
              },
              {
                srcset: "/images/decoImage.webp",
                type: "image/webp",
              },
            ]}
            fallbackSrc="/images/decoImage.jpg"
            alt="Hi there!"
          />
        </figure>
        <article className="col-span-2 text-balance [&>*]:!mb-0">
          <p>
            I&rsquo;m a designer and developer from Belgium with{" "}
            <b className="font-semibold">15+ years of experience</b> in digital
            product design. Currently, I&rsquo;m looking for a full-time UX/UI
            designer role. Want to work with me? Feel free to reach out via{" "}
            <a href="mailto:hey@jeremys.be" className="font-semibold">
              email
            </a>
            .
          </p>
        </article>
      </header>
      <ProjectSection>
        {sortedProjects.map((project) => (
          <ProjectItem key={project.data.name} project={project.data} />
        ))}
      </ProjectSection>
    </>
  );
}
