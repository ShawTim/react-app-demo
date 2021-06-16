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
import Repos from '.';

describe("render Repos", () => {
  const username = "userA";
  const repo = {
    id: 1234,
    name: "repoA",
    description: "repo repo desc",
    full_name: "userA/repoA",
    html_url: "https://github.com/userA/repoA",
  };
  const reducer = combineReducers({ github: githubReducer });

  beforeEach(jest.clearAllMocks);
  afterEach(jest.restoreAllMocks);
  
  it("with no repos", () => {
    const store = createStore(reducer);
    const history = createMemoryHistory({ initialEntries: [`/repos/${username}`] });
    const mockDispatch = jest.fn();
    jest.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(errorSlice, "clearError").mockReturnValue({ type: "", payload: undefined });
    jest.spyOn(githubSlice, "fetchUserRepos");
    const result = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/repos/:username">
            <Repos />
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
    expect(list).toHaveTextContent(`Home ${username}`);
    expect(list.children.length).toBe(2);
    const icons = list.querySelectorAll(".breadcrumb-item .bi");
    expect(icons[0]).toHaveClass("bi-house");
    expect(icons[1]).toHaveClass("bi-github");
  
    expect(errorSlice.clearError).toHaveBeenCalledTimes(0);
    expect(githubSlice.fetchUserRepos).toHaveBeenCalledTimes(1);
    expect(githubSlice.fetchUserRepos).toHaveBeenCalledWith(username);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  
    const homePage = within(list).getByText("Home");
    fireEvent.click(homePage);

    expect(history.location.pathname).toEqual("/");
    expect(errorSlice.clearError).toHaveBeenCalledTimes(1);
  });
  
  it("with repos", () => {
    const store = createStore(reducer, { github: { repos: { [username]: [repo] }, files: {}, readmes: {} }});
    const history = createMemoryHistory({ initialEntries: [`/repos/${username}`] });
    const mockDispatch = jest.fn();
    jest.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(errorSlice, "clearError").mockReturnValue({ type: "", payload: undefined });
    jest.spyOn(githubSlice, "fetchUserRepos");
    const result = render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/repos/:username">
            <Repos />
          </Route>
        </Router>
      </Provider>
    );
  
    expect(result.container.children.length).toEqual(3);

    expect(errorSlice.clearError).toHaveBeenCalledTimes(0);
    expect(githubSlice.fetchUserRepos).toHaveBeenCalledTimes(0);
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  
    const repoListItem = result.getByRole("button");
    expect(repoListItem).toHaveTextContent(`${repo.name}${repo.description}`);
    const repoIcon = repoListItem.querySelector(".repo-name .bi");
    expect(repoIcon).toHaveClass("bi-code");

    fireEvent.click(repoListItem);
  
    expect(history.location.pathname).toEqual(`/files/${username}/${repo.name}`);
    expect(errorSlice.clearError).toHaveBeenCalledTimes(1);
  });
});