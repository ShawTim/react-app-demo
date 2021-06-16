import React from 'react';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import errorReducer from '@features/error/slice';
import ErrorBar from '.';

const randomString = () => Math.random().toString(36).substring(2);

describe("render ErrorBar", () => {
  it("without error", () => {
    const reducer = combineReducers({ error: errorReducer });
    const store = createStore(reducer, { error: { message: "" }});
    const result = render(
      <Provider store={store}>
        <ErrorBar />
      </Provider>
    );
  
    expect(result.container.children.length).toBe(0);
  });
  
  it("with error", () => {
    const reducer = combineReducers({ error: errorReducer });
    const error = randomString();
    const store = createStore(reducer, { error: { message: error }});
    const result = render(
      <Provider store={store}>
        <ErrorBar />
      </Provider>
    );
  
    const errorBarNode = result.getByText(error);
    expect(errorBarNode).toBeDefined();
    expect(errorBarNode).toBeVisible();
    expect(errorBarNode).toHaveTextContent(error);
  
    const iconNode = errorBarNode.children[0];
    expect(iconNode).toBeDefined();
    expect(iconNode).toHaveClass("bi", "bi-exclamation-triangle-fill");
    expect(iconNode).not.toHaveTextContent(/./);
  });
  
});