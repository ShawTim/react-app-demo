import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUserRepos as fetchUserReposAPI,
  fetchRepoFiles as fetchRepoFilesAPI,
  fetchReadme as fetchReadmeAPI,
} from './api';

export type GithubRepo = {
  id: number,
  name: string,
  description: string,
  full_name: string,
  html_url: string,
};
export type GithubFile = {
  name: string,
  path: string,
  size: number,
  download_url: string | null,
  type: 'file' | 'dir',
};

export type GithubState = {
  repos: {
    [username: string]: Array<GithubRepo>,
  },
  files: {
    [full_name: string]: Array<GithubFile>,
  },
  readmes: {
    [download_url: string]: string,
  },
};

const initialState: GithubState = {
  repos: {},
  files: {},
  readmes: {},
};

export const fetchUserRepos = createAsyncThunk(
  'github/fetchUserRepos',
  async (username: string) => await fetchUserReposAPI(username),
);
export const fetchRepoFiles = createAsyncThunk(
  'github/fetchRepoFiles',
  async (full_name: string) => await fetchRepoFilesAPI(full_name),
);
export const fetchReadme = createAsyncThunk(
  'github/fetchReadme',
  async (download_url: string) => await fetchReadmeAPI(download_url),
);

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => builder
    .addCase(fetchUserRepos.fulfilled, (state, action) => {
      const username = action.meta.arg;
      if (username) {
        state.repos[username] = action.payload;
      }
    })
    .addCase(fetchRepoFiles.fulfilled, (state, action) => {
      const full_name = action.meta.arg;
      if (full_name) {
        state.files[full_name] = action.payload;
      }
    })
    .addCase(fetchReadme.fulfilled, (state, action) => {
      const download_url = action.meta.arg;
      if (download_url) {
        state.readmes[download_url] = action.payload;
      }
    }),
});

export const { clear } = githubSlice.actions;

export default githubSlice.reducer;
