import { fetchProjectDemo, fetchPreviewDemoVideos } from "@utils/project-demo";
import PreviewVideo from "./PreviewVideo";
import { ListGitHubRepo } from "@utils/types";

type ProjectWithPreview = ListGitHubRepo & {
  previewUrl: string;
};

export default async function Projects() {
  const { projects } = await fetchProjectDemo();

  const projectsWithPreview: ProjectWithPreview[] = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      previewUrl: await fetchPreviewDemoVideos(
        project.name,
        "/public/responsive.mp4",
      ),
    })),
  );

  return (
    <div className="grid gap-4 max-w-180 tablet-portrait:w-[90vw] justify-self-center py-5">
      {projectsWithPreview.map((project) => (
        <div key={project.id}>
          <PreviewVideo src={project.previewUrl} />
          <article className="rounded-xl border p-4">
            <h3 className="text-size-md font-semibold">{project.name}</h3>
            <p className="mt-2 text-sm text-pretty">
              {project.description ?? "No description available."}
            </p>
            <a
              href={project.html_url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-accent"
            >
              View on GitHub
            </a>
          </article>
        </div>
      ))}
    </div>
  );
}
