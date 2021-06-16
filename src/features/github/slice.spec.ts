import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@base/app/store';
import githubReducer, {
  GithubState,
  clear,
  fetchUserRepos,
  fetchRepoFiles,
  fetchReadme,
  GithubRepo,
  GithubFile,
} from './slice';
import * as api from './api';

const randomString = () => Math.random().toString(36).substring(2);

describe("github reducer", () => {
  const initialState: GithubState = {
    repos: {},
    files: {},
    readmes: {},
  };
  const username = "userA";
  const full_name = "userA/repoA";
  const download_url = "https://raw.githubusercontent.com/userA/repoA/master/README.md";

  beforeEach(jest.clearAllMocks);
  afterEach(jest.restoreAllMocks);

  it("test initial state", () => {
    const newState = githubReducer(undefined, { type: "" });
    expect(newState).toEqual(initialState);
  });

  it("test clear", () => {
    const state: GithubState = {
      repos: { [username]: [] },
      files: { [full_name]: [] },
      readmes: { [download_url]: "" },
    }
    const newState = githubReducer(state, clear());
    expect(newState).toEqual(initialState);
  });

  it("test fetchUserRepos", async () => {
    const userRepo: GithubRepo = {
      id: 1234,
      name: randomString(),
      description: randomString(),
      full_name: randomString(),
      html_url: randomString(),
    };
    jest.spyOn(api, "fetchUserRepos").mockImplementation(async () => [userRepo]);
    const store = configureStore({ reducer: rootReducer });
    const state1 = store.getState();
    expect(state1.github.repos[username]).toBeUndefined();

    await store.dispatch(fetchUserRepos(username));
    const state2 = store.getState();

    expect(api.fetchUserRepos).toHaveBeenCalledWith(username);
    expect(api.fetchUserRepos).toHaveBeenCalledTimes(1);
    expect(state2.github.repos[username]).toEqual([userRepo]);
  });

  it("test fetchUserRepos with empty username", async () => {
    const userRepo: GithubRepo = {
      id: 1234,
      name: randomString(),
      description: randomString(),
      full_name: randomString(),
      html_url: randomString(),
    };
    jest.spyOn(api, "fetchUserRepos").mockImplementation(async () => [userRepo]);
    const store = configureStore({ reducer: rootReducer });
    const state1 = store.getState();
    expect(state1.github.repos[""]).toBeUndefined();

    await store.dispatch(fetchUserRepos(""));
    const state2 = store.getState();

    expect(api.fetchUserRepos).toHaveBeenCalledWith("");
    expect(api.fetchUserRepos).toHaveBeenCalledTimes(1);
    expect(state2.github.repos[""]).toBeUndefined();
  });

  it("test fetchRepoFiles", async () => {
    const repoFile: GithubFile = {
      name: randomString(),
      path: randomString(),
      size: 1234,
      download_url: randomString(),
      type: "file",
    };
    jest.spyOn(api, "fetchRepoFiles").mockImplementation(async () => [repoFile]);
    const store = configureStore({ reducer: rootReducer });
    const state1 = store.getState();
    expect(state1.github.files[full_name]).toBeUndefined();

    await store.dispatch(fetchRepoFiles(full_name));
    const state2 = store.getState();
    
    expect(api.fetchRepoFiles).toHaveBeenCalledWith(full_name);
    expect(api.fetchRepoFiles).toHaveBeenCalledTimes(1);
    expect(state2.github.files[full_name]).toEqual([repoFile]);
  });

  it("test fetchRepoFiles with empty full_name", async () => {
    const repoFile: GithubFile = {
      name: randomString(),
      path: randomString(),
      size: 1234,
      download_url: randomString(),
      type: "file",
    };
    jest.spyOn(api, "fetchRepoFiles").mockImplementation(async () => [repoFile]);
    const store = configureStore({ reducer: rootReducer });
    const state1 = store.getState();
    expect(state1.github.files[""]).toBeUndefined();

    await store.dispatch(fetchRepoFiles(""));
    const state2 = store.getState();
    
    expect(api.fetchRepoFiles).toHaveBeenCalledWith("");
    expect(api.fetchRepoFiles).toHaveBeenCalledTimes(1);
    expect(state2.github.files[""]).toBeUndefined();
  });

  it("test fetchReadme", async () => {
    const readme = randomString();
    jest.spyOn(api, "fetchReadme").mockImplementation(async () => readme);
    const store = configureStore({ reducer: rootReducer });
    const state1 = store.getState();
    expect(state1.github.readmes[download_url]).toBeUndefined();

    await store.dispatch(fetchReadme(download_url));
    const state2 = store.getState();
    
    expect(api.fetchReadme).toHaveBeenCalledWith(download_url);
    expect(api.fetchReadme).toHaveBeenCalledTimes(1);
    expect(state2.github.readmes[download_url]).toEqual(readme);
  });

  it("test fetchReadme", async () => {
    const readme = randomString();
    jest.spyOn(api, "fetchReadme").mockImplementation(async () => readme);
    const store = configureStore({ reducer: rootReducer });
    const state1 = store.getState();
    expect(state1.github.readmes[""]).toBeUndefined();

    await store.dispatch(fetchReadme(""));
    const state2 = store.getState();
    
    expect(api.fetchReadme).toHaveBeenCalledWith("");
    expect(api.fetchReadme).toHaveBeenCalledTimes(1);
    expect(state2.github.readmes[""]).toBeUndefined();
  });
});
