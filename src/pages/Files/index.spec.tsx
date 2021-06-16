import React from 'react';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { fireEvent, render, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';

import githubReducer from '@features/github/slice';
import * as hooks from '@base/app/hooks';
import * as errorSlice from '@features/error/slice';
import * as githubSlice from '@features/github/slice';
import Files from '.';

describe("render Files", () => {
  const username = "userA";
  const repo = "repoA";
  const full_name = `${username}/${repo}`;
  const download_url = `https://raw.githubusercontent.com/${full_name}/master/README.md`;
  const dir: githubSlice.GithubFile = {
    name: "test",
    path: "test",
    size: 0,
    download_url: null,
    type: "dir",
  };
  const file: githubSlice.GithubFile = {
    name: "README.md",
    path: "README.md",
    size: 345,
    download_url,
    type: "file",
  };
  const readme = "### Heading level 3\n\nI just love **bold text**.";
  const reducer = combineReducers({ github: githubReducer });

  beforeEach(jest.clearAllMocks);
  afterEach(jest.restoreAllMocks);
  
  it("with no files", () => {
    const store = createStore(reducer);
    const history = createMemoryHistory({ initialEntries: [`/files/${username}/${repo}`] });
    const mockDispatch = jest.fn();
    jest.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(errorSlice, "clearError").mockReturnValue({ type: "", payload: undefined });
    jest.spyOn(githubSlice, "fetchRepoFiles");
    jest.spyOn(githubSlice, "fetchReadme");
    const result = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/files/:username/:repo">
            <Files />
          </Route>
        </Router>
      </Provider>
    );
  
    expect(result.container.children.length).toEqual(1);
  
    const nav = result.getByRole("navigation");
    expect(nav).toBeDefined();
    expect(nav).toBeVisible();
    const list = within(nav).getByRole("list");
    expect(list).toBeDefined();
    expect(list).toBeVisible();
    expect(list).toHaveClass("breadcrumb");
    expect(list).toHaveTextContent(`Home ${username} ${repo}`);
    expect(list.children.length).toBe(3);
    const icons = list.querySelectorAll(".breadcrumb-item .bi");
    expect(icons[0]).toHaveClass("bi-house");
    expect(icons[1]).toHaveClass("bi-github");
    expect(icons[2]).toHaveClass("bi-code");
  
    expect(errorSlice.clearError).toHaveBeenCalledTimes(0);
    expect(githubSlice.fetchRepoFiles).toHaveBeenCalledTimes(1);
    expect(githubSlice.fetchRepoFiles).toHaveBeenCalledWith(full_name);
    expect(githubSlice.fetchReadme).toHaveBeenCalledTimes(0);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  
    const repoPage = within(list).getByText(username);
    fireEvent.click(repoPage);

    expect(history.location.pathname).toEqual(`/repos/${username}`);
    expect(errorSlice.clearError).toHaveBeenCalledTimes(1);
  });
  
  it("with files, no readme", () => {
    const store = createStore(reducer, { github: { repos: {}, files: { [full_name]: [file, dir] }, readmes: {} }});
    const history = createMemoryHistory({ initialEntries: [`/files/${username}/${repo}`] });
    const mockDispatch = jest.fn();
    jest.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(errorSlice, "clearError").mockReturnValue({ type: "", payload: undefined });
    jest.spyOn(githubSlice, "fetchRepoFiles");
    jest.spyOn(githubSlice, "fetchReadme");
    const result = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/files/:username/:repo">
            <Files />
          </Route>
        </Router>
      </Provider>
    );
  
    expect(result.container.children.length).toEqual(4);
  
    expect(errorSlice.clearError).toHaveBeenCalledTimes(0);
    expect(githubSlice.fetchRepoFiles).toHaveBeenCalledTimes(0);
    expect(githubSlice.fetchReadme).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  
    const dataList = result.container.querySelector(".data-list") as HTMLElement;
    const dataListItems = dataList.querySelectorAll(".list-group-item");
    expect(dataListItems[0]).toHaveTextContent(`${dir.name}/`);
    expect(dataListItems[0].querySelector(".bi")).toHaveClass("bi-folder-fill");
    expect(dataListItems[1]).toHaveTextContent(file.name);
    expect(dataListItems[1].querySelector(".bi")).toHaveClass("bi-file-earmark");
  
    const nav = result.getByRole("navigation");
    const list = within(nav).getByRole("list");
    const repoPage = within(list).getByText(username);
    fireEvent.click(repoPage);

    expect(history.location.pathname).toEqual(`/repos/${username}`);
    expect(errorSlice.clearError).toHaveBeenCalledTimes(1);
  });
  
  it("with files, and readme", () => {
    const store = createStore(reducer, { github: { repos: {}, files: { [full_name]: [file] }, readmes: { [download_url]: readme }}});
    const history = createMemoryHistory({ initialEntries: [`/files/${username}/${repo}`] });
    const mockDispatch = jest.fn();
    jest.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(errorSlice, "clearError").mockReturnValue({ type: "", payload: undefined });
    jest.spyOn(githubSlice, "fetchRepoFiles");
    jest.spyOn(githubSlice, "fetchReadme");
    const result = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/files/:username/:repo">
            <Files />
          </Route>
        </Router>
      </Provider>
    );
  
    expect(result.container.children.length).toEqual(4);
  
    expect(errorSlice.clearError).toHaveBeenCalledTimes(0);
    expect(githubSlice.fetchRepoFiles).toHaveBeenCalledTimes(0);
    expect(githubSlice.fetchReadme).toHaveBeenCalledTimes(0);
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  
    const card = result.container.querySelector(".card") as HTMLElement;
    const cardHeader = card.querySelector(".card-header");
    const heading = within(card).getByRole("heading");
    expect(cardHeader).toHaveTextContent("README.md");
    expect(heading).toHaveTextContent("Heading level 3");
    expect(heading.tagName).toMatch(/h3/i);

    const nav = result.getByRole("navigation");
    const list = within(nav).getByRole("list");
    const repoPage = within(list).getByText(username);
    fireEvent.click(repoPage);

    expect(history.location.pathname).toEqual(`/repos/${username}`);
    expect(errorSlice.clearError).toHaveBeenCalledTimes(1);
  });
});