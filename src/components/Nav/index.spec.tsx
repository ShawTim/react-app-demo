import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Nav from '.';

const randomString = () => Math.random().toString(36).substring(2);

describe("render Nav", () => {

  it("without username and repo", () => {
    const result = render(<Nav />);
  
    const homeLiNode = result.getByText(/home/i);
    const parentNode = homeLiNode.parentNode;
    expect(parentNode?.children.length).toBe(1);
  
    expect(homeLiNode).toBeDefined();
    expect(homeLiNode).toBeVisible();
    expect(homeLiNode).toHaveTextContent(/home/i);
    expect(homeLiNode.tagName).toMatch(/li/i);
  
    const iconNode = homeLiNode.children[0];
    expect(iconNode).toBeDefined();
    expect(iconNode).toHaveClass("bi", "bi-house");
    expect(iconNode).not.toHaveTextContent(/./);
  });
  
  it("with username, without repo", () => {
    const history = createMemoryHistory();
    const username = randomString();
    const result = render(
      <Router history={history}>
        <Nav username={username} />
      </Router>
    );
  
    const homeANode = result.getByText(/home/i);
    const homeLiNode = homeANode.parentNode;
    const homeParentNode = homeLiNode?.parentNode;
    expect(homeParentNode?.children.length).toBe(2);
    expect(homeParentNode?.children[0]).toBe(homeLiNode);
  
    expect(homeANode).toBeDefined();
    expect(homeANode).toBeVisible();
    expect(homeANode).toHaveTextContent(/home/i);
    expect(homeANode.tagName).toMatch(/a/i);
    expect(homeANode.getAttribute("href")).toBe("/");
  
    const homeIconNode = homeANode.children[0];
    expect(homeIconNode).toBeDefined();
    expect(homeIconNode).toHaveClass("bi", "bi-house");
    expect(homeIconNode).not.toHaveTextContent(/./);
  
    const usernameNode = result.getByText(username);
    const usernameParentNode = usernameNode.parentNode;
    expect(homeParentNode).toBe(usernameParentNode);
    expect(homeParentNode?.children[1]).toBe(usernameNode);
  
    expect(usernameNode).toBeDefined();
    expect(usernameNode).toBeVisible();
    expect(usernameNode).toHaveTextContent(username);
    expect(usernameNode.tagName).toMatch(/li/i);
  
    const usernameIconNode = usernameNode.children[0];
    expect(usernameIconNode).toBeDefined();
    expect(usernameIconNode).toHaveClass("bi", "bi-github");
    expect(usernameIconNode).not.toHaveTextContent(/./);
  });
  
  it("with username and repo", () => {
    const history = createMemoryHistory();
    const username = randomString();
    const repo = randomString();
    const result = render(
      <Router history={history}>
        <Nav username={username} repo={repo} />
      </Router>
    );
  
    const homeANode = result.getByText(/home/i);
    const homeLiNode = homeANode.parentNode;
    const homeParentNode = homeLiNode?.parentNode;
    expect(homeParentNode?.children.length).toBe(3);
    expect(homeParentNode?.children[0]).toBe(homeLiNode);
  
    expect(homeANode).toBeDefined();
    expect(homeANode).toBeVisible();
    expect(homeANode).toHaveTextContent(/home/i);
    expect(homeANode.tagName).toMatch(/a/i);
    expect(homeANode.getAttribute("href")).toBe("/");
  
    const homeIconNode = homeANode.children[0];
    expect(homeIconNode).toBeDefined();
    expect(homeIconNode).toHaveClass("bi", "bi-house");
    expect(homeIconNode).not.toHaveTextContent(/./);
  
    const usernameANode = result.getByText(username);
    const usernameLiNode = usernameANode.parentNode;
    const usernameParentNode = usernameLiNode?.parentNode;
    expect(homeParentNode).toBe(usernameParentNode);
    expect(homeParentNode?.children[1]).toBe(usernameLiNode);
  
    expect(usernameANode).toBeDefined();
    expect(usernameANode).toBeVisible();
    expect(usernameANode).toHaveTextContent(username);
    expect(usernameANode.tagName).toMatch(/a/i);
    expect(usernameANode.getAttribute("href")).toBe(`/repos/${username}`);
  
    const usernameIconNode = usernameANode.children[0];
    expect(usernameIconNode).toBeDefined();
    expect(usernameIconNode).toHaveClass("bi", "bi-github");
    expect(usernameIconNode).not.toHaveTextContent(/./);
  
    const repoNode = result.getByText(repo);
    const repoParentNode = repoNode.parentNode;
    expect(homeParentNode).toBe(repoParentNode);
    expect(homeParentNode?.children[2]).toBe(repoNode);
  
    expect(repoNode).toBeDefined();
    expect(repoNode).toBeVisible();
    expect(repoNode).toHaveTextContent(repo);
    expect(repoNode.tagName).toMatch(/li/i);
  
    const repoIconNode = repoNode.children[0];
    expect(repoIconNode).toBeDefined();
    expect(repoIconNode).toHaveClass("bi", "bi-code");
    expect(repoIconNode).not.toHaveTextContent(/./);
  });
});