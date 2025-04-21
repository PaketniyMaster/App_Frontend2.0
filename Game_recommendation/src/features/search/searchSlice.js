import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  filters: {
    tags: "",
    min_rating: "",
    max_rating: "",
    searchDescription: false, // новое поле
  },
  results: []
};

const validateRating = (value) => {
  if (value === "") return "";
  const num = Number(value);
  if (isNaN(num)) return "";
  if (num < 0) return "0";
  if (num > 100) return "100";
  return num.toString();
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setTag(state, action) {
      state.filters.tags = action.payload;
    },
    setMinRating(state, action) {
      state.filters.min_rating = validateRating(action.payload);
    },
    setMaxRating(state, action) {
      state.filters.max_rating = validateRating(action.payload);
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
    setSearchDescription(state, action) {
      state.filters.searchDescription = action.payload;
    },
    

    setFilters(state, action) {
      const { tags = "", min_rating = "", max_rating = "" } = action.payload || {};
      state.filters.tags = tags;
      state.filters.min_rating = validateRating(min_rating);
      state.filters.max_rating = validateRating(max_rating);
    }
  },
});

export const {
  setQuery,
  setTag,
  setMinRating,
  setMaxRating,
  resetFilters,
  setResults,
  setFilters,
  setSearchDescription,
} = searchSlice.actions;

export default searchSlice.reducer;
