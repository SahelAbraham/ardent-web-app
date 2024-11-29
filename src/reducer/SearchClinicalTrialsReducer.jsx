import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clinicalTrialSearchResults: {
        items: [],
      },
    clinicalTrialDetails : {
      items: [],
    },
    clinicalTrialsInfo : {
      ct_id_array: [],
      ct_condition_names_array: [],
      ct_condition_names_map: []
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
    },
    addClinicalTrialInfoList: (state, action) => {
      state.clinicalTrialDetails.items = [];
    },
    addClinicalTrialsInfo_ct_id_array: (state, action) => {
      // state.clinicalTrialsInfo.ct_id_array = {...state.clinicalTrialsInfo, ct_id_array: action.payload};
      state.clinicalTrialsInfo.ct_id_array = action.payload == null ? [] : action.payload
    },
    addClinicalTrialsInfo_ct_condition_names_array: (state, action) => {
      state.clinicalTrialsInfo.ct_condition_names_array = action.payload == null ? [] : action.payload
    },
    addClinicalTrialsInfo_ct_condition_names_map: (state, action) => {
      // state.clinicalTrialsInfo.ct_condition_names_map = {...state.clinicalTrialsInfo, ct_condition_names_map: action.payload};
      state.clinicalTrialsInfo.ct_condition_names_map = action.payload == null ? [] : action.payload
    },        
    resetClinicalTrialsInfo: (state, action) => {
      state.clinicalTrialDetails.ct_id_array = [];
      state.clinicalTrialDetails.ct_condition_names_array = [];
      state.clinicalTrialDetails.ct_condition_names_map = [];
    },    
  },
})

// Action creators are generated for each case reducer function
export const { addClinicalTrialSearchResult, 
  resetClinicalTrialSearchResult, 
  addClinicalTrialDetails,
  addClinicalTrialsInfo_ct_id_array,
  addClinicalTrialsInfo_ct_condition_names_array,
  addClinicalTrialsInfo_ct_condition_names_map,
  resetClinicalTrialsInfo,
  resetClinicalTrialDetails} = SearchClinicalTrialsResultsSlice.actions

export default SearchClinicalTrialsResultsSlice.reducer