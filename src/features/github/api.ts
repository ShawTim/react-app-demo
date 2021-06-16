export const fetchUserRepos = async (username: string) => {
  if (!username) return [];

  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const body = await response.json();
  if (!response.ok) throw new Error(body.message ?? response.statusText);
  return body;
}

export const fetchRepoFiles = async (full_name: string) => {
  if (!full_name) return [];

  const response = await fetch(`https://api.github.com/repos/${full_name}/contents`);
  const body = await response.json();
  if (!response.ok) throw new Error(body.message ?? response.statusText);
  return body;
}

export const fetchReadme = async (download_url: string) => {
  if (!download_url) return "";

  const response = await fetch(download_url);
  const body = await response.json();
  if (!response.ok) throw new Error(body.message ?? response.statusText);
  return body;
}