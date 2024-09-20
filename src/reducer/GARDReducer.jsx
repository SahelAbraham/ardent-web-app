import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    rareDiseases: {
        items: [],
      },
}

export const GARDResultsSlice = createSlice({
  name: 'listGARDResults',
  initialState,
  reducers: {
    addRareDiseasesListResult: (state, action) => {
        // state.rareDiseases.items = [...state.rareDiseases.items, ...action.payload];
        state.rareDiseases.items = action.payload["rare_diseases"]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addRareDiseasesListResult } = GARDResultsSlice.actions

export default GARDResultsSlice.reducer