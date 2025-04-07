import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  filters: {
    tags: "",
    min_rating: "",
    max_rating: "",
  },
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
    setSearchState(state, action) {
      return { ...state, ...action.payload };
    },
    resetSearch(state) {
      return initialState;
    },
  },
});

export const { setQuery, setFilters, setResults, setSearchState, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
