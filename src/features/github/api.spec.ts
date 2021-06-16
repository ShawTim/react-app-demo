import {
  fetchUserRepos,
  fetchRepoFiles,
  fetchReadme,
} from './api';

describe("github api", () => {
  const username = "userA";
  const full_name = "userA/repoA";
  const download_url = "https://raw.githubusercontent.com/userA/repoA/master/README.md";
  const bodyOK = new Blob(["[1,2,3]"], { type : "application/json" });
  const bodyNotFound1 = new Blob(["{\"message\":\"Not Found 1\"}"], { type : "application/json" });
  const bodyNotFound2 = new Blob(["{}"], { type : "application/json" });
  const createResponseOK = () => new Response(bodyOK, { status: 200, statusText: "OK" });
  const createResponseNotFound1 = () => new Response(bodyNotFound1, { status: 404, statusText: "Not Found" });
  const createResponseNotFound2 = () => new Response(bodyNotFound2, { status: 404, statusText: "Not Found" });

  beforeEach(jest.clearAllMocks);
  afterEach(jest.restoreAllMocks);

  it("test fetchUserRepos with username with success", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseOK()));
    const body = await fetchUserRepos(username);

    expect(fetch).toHaveBeenCalledWith(`https://api.github.com/users/${username}/repos`);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(body).toEqual([1, 2, 3]);
  });

  it("test fetchUserRepos with username with failure 1", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseNotFound1()));
    const func = async () => await fetchUserRepos(username);

    await expect(func).rejects.toThrow("Not Found 1");
    expect(fetch).toHaveBeenCalledWith(`https://api.github.com/users/${username}/repos`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("test fetchUserRepos with username with failure 2", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseNotFound2()));
    const func = async () => await fetchUserRepos(username);

    await expect(func).rejects.toThrow("Not Found");
    expect(fetch).toHaveBeenCalledWith(`https://api.github.com/users/${username}/repos`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("test fetchUserRepos with empty string", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseOK()));
    await fetchUserRepos("");

    expect(fetch).not.toHaveBeenCalled();
  });

  it("test fetchRepoFiles with full_name with success", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseOK()));
    const body = await fetchRepoFiles(full_name);

    expect(fetch).toHaveBeenCalledWith(`https://api.github.com/repos/${full_name}/contents`);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(body).toEqual([1, 2, 3]);
  });

  it("test fetchRepoFiles with full_name with failure 1", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseNotFound1()));
    const func = async () => await fetchRepoFiles(full_name);

    await expect(func).rejects.toThrow("Not Found 1");
    expect(fetch).toHaveBeenCalledWith(`https://api.github.com/repos/${full_name}/contents`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("test fetchRepoFiles with full_name with failure 2", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseNotFound2()));
    const func = async () => await fetchRepoFiles(full_name);

    await expect(func).rejects.toThrow("Not Found");
    expect(fetch).toHaveBeenCalledWith(`https://api.github.com/repos/${full_name}/contents`);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("test fetchRepoFiles with empty string", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseOK()));
    await fetchRepoFiles("");

    expect(fetch).not.toHaveBeenCalled();
  });

  it("test fetchReadme with download_url with success", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseOK()));
    const body = await fetchReadme(download_url);

    expect(fetch).toHaveBeenCalledWith(download_url);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(body).toEqual([1, 2, 3]);
  });

  it("test fetchReadme with download_url with failure 1", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseNotFound1()));
    const func = async () => await fetchReadme(download_url);

    await expect(func).rejects.toThrow("Not Found 1");
    expect(fetch).toHaveBeenCalledWith(download_url);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("test fetchReadme with download_url with failure 2", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseNotFound2()));
    const func = async () => await fetchReadme(download_url);

    await expect(func).rejects.toThrow("Not Found");
    expect(fetch).toHaveBeenCalledWith(download_url);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("test fetchReadme with empty string", async () => {
    jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(createResponseOK()));
    await fetchReadme("");

    expect(fetch).not.toHaveBeenCalled();
  });
});
