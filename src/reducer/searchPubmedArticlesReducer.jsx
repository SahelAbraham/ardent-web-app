import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchResults: {
        items: [],
      },
}

export const searchPubmedArticlesResultsSlice = createSlice({
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
export const { addSearchResult, resetSearchResult } = searchPubmedArticlesResultsSlice.actions

export default searchPubmedArticlesResultsSlice.reducer