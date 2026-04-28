import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: process.env.PORTFOLIO_TOKEN,
});

export const githubUserName = "gulbin-dev";
