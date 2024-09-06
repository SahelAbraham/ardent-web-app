import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: {
        notifyFlag: false,
        notifyMessage: "",
      },
}

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifcation: (state, action) => {
        return {...state, notification: action.payload};
    },
    resetNotification: (state, action) => {
     return {...state, notification: {
        notifyFlag: false,
        notifyMessage: "",
      }};
  }
  },
})

// Action creators are generated for each case reducer function
export const { setNotifcation, resetNotification } = NotificationSlice.actions

export default NotificationSlice.reducer