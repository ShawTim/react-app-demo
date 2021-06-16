import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store, history } from './app/store';

const randomString = () => Math.random().toString(36).substring(2);

describe("render App", () => {
  beforeEach(jest.clearAllMocks);
  afterEach(jest.restoreAllMocks);

  it("test pages", () => {
    const mockHomeID = randomString();
    const mockReposID = randomString();
    const mockFilesID = randomString();
    const MockHome = () => <div data-testid={mockHomeID}></div>;
    const MockRepos = () => <div data-testid={mockReposID}></div>;
    const MockFiles = () => <div data-testid={mockFilesID}></div>;
    jest.mock("@pages/Home", () => MockHome);
    jest.mock("@pages/Repos", () => MockRepos);
    jest.mock("@pages/Files", () => MockFiles);

    const App = require("./App").default;
    const result = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  
    const home = result.getByTestId(mockHomeID);
    expect(home).toBeDefined();
    expect(home).toBeVisible();

    history.push("/repos/userA");
    const repos = result.getByTestId(mockReposID);
    expect(repos).toBeDefined();
    expect(repos).toBeVisible();

    history.push("/files/userA/repoA");
    const files = result.getByTestId(mockFilesID);
    expect(files).toBeDefined();
    expect(files).toBeVisible();
  });
});