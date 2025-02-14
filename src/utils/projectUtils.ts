import fs from "fs";
import path from "path";

export interface ProjectArtwork {
  src: string;
  caption: string;
  colSpan?: number;
  mdColSpan?: number;
  lgColSpan?: number;
}

export interface ProjectData {
  name: string;
  tagline: string;
  description: string;
  role: string;
  startDate: string;
  endDate: string;
  heroArtwork: string;
  artwork: ProjectArtwork[];
}

export interface Project {
  data: ProjectData;
}

const projectsOrder = [
  "gamepal",
  "yally",
  "koopr",
  "planticus",
  "helpper",
  "opensesame",
  "digipolis",
  "scorecard",
  "shelf",
  "immo brown",
  "diabetik",
  "realo",
];

interface SortProjectsOptions {
  exclude?: string[];
}

export async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(process.cwd(), "src/content/work");
  const fileNames = fs.readdirSync(projectsDirectory);

  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(projectsDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const projectData = JSON.parse(fileContent) as ProjectData;

      return {
        data: projectData,
      };
    });

  return projects;
}

export function sortProjects(
  projects: Project[],
  options: SortProjectsOptions = {}
) {
  // First filter out excluded projects if any
  const filteredProjects = options.exclude
    ? projects.filter(
        (project) => !options.exclude?.includes(project.data.name.toLowerCase())
      )
    : projects;

  // Then sort the remaining projects
  return filteredProjects.sort((a, b) => {
    const orderA = projectsOrder.indexOf(a.data.name.toLowerCase());
    const orderB = projectsOrder.indexOf(b.data.name.toLowerCase());
    return orderA - orderB;
  });
}

export function formatProjectSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "");
}

export async function getProjectImage(projectName: string, imageName: string) {
  try {
    if (imageName.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
      return `/images/work/${formatProjectSlug(projectName)}/${imageName}`;
    }

    const extensions = [".webp", ".png", ".jpg", ".jpeg", ".avif"];
    for (const ext of extensions) {
      const fullPath = `/images/work/${formatProjectSlug(
        projectName
      )}/${imageName}${ext}`;
      return fullPath;
    }

    return `/images/work/${formatProjectSlug(projectName)}/${imageName}.webp`;
  } catch (error) {
    console.error(`Error loading image for project ${projectName}:`, error);
    throw new Error(`Image for project ${projectName} not found`);
  }
}

export async function getProjectHeroImage(
  projectName: string,
  heroArtwork: string
) {
  try {
    const imagePath = `/images/work/${formatProjectSlug(
      projectName
    )}/${heroArtwork}`;
    return imagePath;
  } catch (error) {
    console.error(
      `Error loading hero image for project ${projectName}:`,
      error
    );
    throw new Error(`Hero image for project ${projectName} not found`);
  }
}
