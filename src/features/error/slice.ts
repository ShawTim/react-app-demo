import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserRepos, fetchRepoFiles, fetchReadme } from '@features/github/slice';

export type ErrorState = {
  message: string;
};

const initialState: ErrorState = {
  message: "",
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.message = action.payload || "";
    },
    clearError: (state) => initialState,
  },
  extraReducers: (builder) => builder
    .addCase(fetchUserRepos.rejected, (state, action) => {
      state.message = action.error.message || "";
    })
    .addCase(fetchRepoFiles.rejected, (state, action) => {
      state.message = action.error.message || "";
    })
    .addCase(fetchReadme.rejected, (state, action) => {
      state.message = action.error.message || "";
    }),
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
