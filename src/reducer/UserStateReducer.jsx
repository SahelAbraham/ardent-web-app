import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userConfiguration: {},
    userConfigurationSavedFlag : false,
    userName: 'temp',
    userId: "temp"
}

export const UserStateSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUserConfiguration: (state, action) => {
        state.userConfiguration = action.payload
    },
    setUserConfigurationPostedFlag : (state, action) => {
        state.userConfigurationSavedFlag = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserConfiguration, setUserConfigurationPostedFlag } = UserStateSlice.actions

export default UserStateSlice.reducer