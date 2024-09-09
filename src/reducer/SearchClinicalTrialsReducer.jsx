import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clinicalTrialSearchResults: {
        items: [],
      },
    clinicalTrialDetails : {
      items: [],
    }
}

export const SearchClinicalTrialsResultsSlice = createSlice({
  name: 'searchClinicalTrials',
  initialState,
  reducers: {
    addClinicalTrialSearchResult: (state, action) => {
      state.clinicalTrialSearchResults.items = [...state.clinicalTrialSearchResults.items, action.payload];
    },
    resetClinicalTrialSearchResult: (state, action) => {
      state.clinicalTrialSearchResults.items = [];
    },
    addClinicalTrialDetails: (state, action) => {
      state.clinicalTrialDetails.items = [...state.clinicalTrialDetails.items, action.payload];
    },
    resetClinicalTrialDetails: (state, action) => {
      state.clinicalTrialDetails.items = [];
}
  },
})

// Action creators are generated for each case reducer function
export const { addClinicalTrialSearchResult, resetClinicalTrialSearchResult, addClinicalTrialDetails,  resetClinicalTrialDetails} = SearchClinicalTrialsResultsSlice.actions

export default SearchClinicalTrialsResultsSlice.reducer