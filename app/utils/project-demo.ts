import { octokit, githubUserName } from "./github-auth";
import { ListGitHubRepo, PreviewVideoContent } from "@utils/types";
export const fetchProjectDemo = async () => {
  const filterNames = ["GulbinDev-Portfolio"];
  let fetchError = false;
  let projects: ListGitHubRepo[] = [];
  try {
    const { data } = await octokit.request(
      `GET /users/${githubUserName}/repos`,
      {
        username: githubUserName,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    projects = Array.isArray(data)
      ? data.filter((repo: ListGitHubRepo) => filterNames.includes(repo.name))
      : [];
  } catch (error) {
    fetchError = true;
    console.error("Failed to load GitHub Repos:", error);
  }

  const reponse = { projects, fetchError };
  return reponse;
};

export const fetchPreviewDemoVideos = async (repo: string, path: string) => {
  try {
    const response = await octokit.request(
      `GET /repos/${githubUserName}/${repo}/contents/${path}`,
      {
        owner: githubUserName,
        repo: repo,
        path: path,
        headers: {
          "X-GitHub-Api-Version": "2026-03-10",
          Accept: "application/vnd.github.v3.raw",
        },
      },
    );

    const previewVideo = response.data as PreviewVideoContent;
    return previewVideo.download_url ?? "";
  } catch (error) {
    console.error("Failed to load GitHub Content:", error);
    return "";
  }
};
