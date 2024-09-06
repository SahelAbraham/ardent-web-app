import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clinicalTrialSearchResults: {
        items: [],
      },
}

export const SearchClinicalTrialsResultsSlice = createSlice({
  name: 'searchPubmedResults',
  initialState,
  reducers: {
    addClinicalTrialSearchResult: (state, action) => {
        state.searchResults.items = [...state.searchResults.items, action.payload];
    },
    resetClinicalTrialSearchResult: (state, action) => {
      state.searchResults.items = [];
  }
  },
})

// Action creators are generated for each case reducer function
export const { addClinicalTrialSearchResult, resetClinicalTrialSearchResult } = SearchClinicalTrialsResultsSlice.actions

export default SearchClinicalTrialsResultsSlice.reducer