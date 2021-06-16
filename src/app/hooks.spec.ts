import { Dispatch } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import * as redux from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks';

describe("test hooks", () => {
  beforeEach(jest.clearAllMocks);
  afterEach(jest.restoreAllMocks);

  it("useDispatch", () => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(null as unknown as Dispatch);

    renderHook(() => useAppDispatch());
    expect(redux.useDispatch).toHaveBeenCalledTimes(1);
  });

  it("useSelector", () => {
    expect(redux.useSelector).toBe(useAppSelector);
  });
});