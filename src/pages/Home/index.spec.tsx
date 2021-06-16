import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Home from '.';

describe("render Home", () => {
  const username = "userA";
  
  it("default", () => {
    const result = render(<Home />);
  
    const nav = result.getByRole("navigation");
    expect(nav).toBeDefined();
    expect(nav).toBeVisible();
    const list = within(nav).getByRole("list");
    expect(list).toBeDefined();
    expect(list).toBeVisible();
    expect(list).toHaveClass("breadcrumb");
    expect(list).toHaveTextContent("Home");
    expect(list.children.length).toBe(1);
    const homeIcon = list.querySelector(".breadcrumb-item.active .bi");
    expect(homeIcon).toHaveClass("bi-house");
  
    const input = result.getByRole("textbox");
    expect(input).toBeDefined();
    expect(input).toBeVisible();
    expect(input.getAttribute("placeholder")).toEqual("Username");
  
    const inputGroup = input.parentNode;
    const githubIcon = inputGroup?.querySelector(".input-group-prepend .input-group-text .bi");
    expect(githubIcon).toHaveClass("bi-github");
  
    const button = result.getByRole("button");
    expect(button).toBeDefined();
    expect(button).toBeVisible();
    expect(button).toHaveTextContent("Query user repos");
  });
  
  it("on input change", () => {
    const result = render(<Home />);
  
    const input = result.getByRole("textbox");
    fireEvent.change(input, { target: { value: username }});
    expect(input).toHaveValue(username);
  });
  
  it("click button without input, still in Home", () => {
    const history = createMemoryHistory();
    const result = render(
      <Router history={history}>
        <Home />
      </Router>
    );
  
    const button = result.getByRole("button");
    fireEvent.click(button);
  
    const nav = result.getByRole("navigation");
    const list = within(nav).getByRole("list");
    expect(list).toHaveTextContent("Home");
    expect(list.children.length).toBe(1);
    expect(history.location.pathname).toEqual("/repos/");
  });
  
  it("click button without input, navigate to Repos", () => {
    const history = createMemoryHistory();
    const result = render(
      <Router history={history}>
        <Home />
      </Router>
    );
  
    const input = result.getByRole("textbox");
    fireEvent.change(input, { target: { value: username }});
    expect(input).toHaveValue(username);
  
    const button = result.getByRole("button");
    fireEvent.click(button);
  
    const nav = result.getByRole("navigation");
    const list = within(nav).getByRole("list");
    expect(list).toHaveTextContent("Home");
    expect(list.children.length).toBe(1);
    expect(history.location.pathname).toEqual(`/repos/${username}`);
  });
});