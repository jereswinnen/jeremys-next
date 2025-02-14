import { getProjects, sortProjects } from "@/utils/projectUtils";
import ProjectItem from "@/components/ProjectItem";

export default async function Home() {
  const projects = await getProjects();
  const sortedProjects = sortProjects(projects, {
    exclude: ["digipolis", "koopr", "opensesame", "planticus", "yally"],
  });

  return (
    <main className="container mx-auto px-4">
      {sortedProjects.map((project) => (
        <ProjectItem key={project.data.name} project={project.data} />
      ))}
    </main>
  );
}
