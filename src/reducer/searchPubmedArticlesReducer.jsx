import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchResults: {
        items: [],
      },
}

export const SearchPubmedArticlesResultsSlice = createSlice({
  name: 'searchPubmedResults',
  initialState,
  reducers: {
    addSearchResult: (state, action) => {
        state.searchResults.items = [...state.searchResults.items, action.payload];
    },
    resetSearchResult: (state, action) => {
      state.searchResults.items = [];
  }
  },
})

// Action creators are generated for each case reducer function
export const { addSearchResult, resetSearchResult } = SearchPubmedArticlesResultsSlice.actions

export default SearchPubmedArticlesResultsSlice.reducer