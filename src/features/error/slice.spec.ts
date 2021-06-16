import errorReducer, {
  ErrorState,
  setError,
  clearError,
} from './slice';
import { fetchUserRepos, fetchRepoFiles, fetchReadme } from '@features/github/slice';

const randomString = () => Math.random().toString(36).substring(2);

describe("error reducer", () => {
  const initialState: ErrorState = { message: "" };

  it("test initial state", () => {
    const newState = errorReducer(undefined, { type: "" });
    expect(newState).toEqual(initialState);
  });

  it("test setError", () => {
    const str = randomString();
    const newState = errorReducer(initialState, setError(str));
    expect(newState.message).toEqual(str);
  });

  it("test setError with empty string", () => {
    const newState = errorReducer(initialState, setError(""));
    expect(newState).toEqual(initialState);
  });

  it("test clearError", () => {
    const str = randomString();
    const state1 = errorReducer(initialState, setError(str));
    const state2 = errorReducer(state1, clearError());
    expect(state1.message).toEqual(str);
    expect(state2.message).toEqual("");
  });

  it("test failure of fetchUserRepos", () => {
    const str = randomString();
    const action = { type: fetchUserRepos.rejected.type, error: { message: str }};
    const newState = errorReducer(initialState, action);
    expect(newState.message).toEqual(str);
  });

  it("test failure of fetchUserRepos with empty string", () => {
    const action = { type: fetchUserRepos.rejected.type, error: { message: "" }};
    const newState = errorReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("test failure of fetchRepoFiles", () => {
    const str = randomString();
    const action = { type: fetchRepoFiles.rejected.type, error: { message: str }};
    const state = errorReducer(initialState, action);
    expect(state.message).toEqual(str);
  });

  it("test failure of fetchRepoFiles with empty string", () => {
    const action = { type: fetchRepoFiles.rejected.type, error: { message: "" }};
    const newState = errorReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("test failure of fetchReadme", () => {
    const str = randomString();
    const action = { type: fetchReadme.rejected.type, error: { message: str }};
    const state = errorReducer(initialState, action);
    expect(state.message).toEqual(str);
  });

  it("test failure of fetchReadme with empty string", () => {
    const action = { type: fetchReadme.rejected.type, error: { message: "" }};
    const newState = errorReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
