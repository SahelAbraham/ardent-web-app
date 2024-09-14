import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: {
        notifyFlag: false,
        notifyMessage: "",
  },
  initialization: {
    ardent_web_app_url:"",
    ardent_web_app_use_mock_data:false,
    // REACT_APP_ARDENT_WEB_APP_URL:"",
    // REACT_APP_USE_MOCK_DATA: false
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
    },
    setWebAppUrl: (state, action) => {
      return {...state, initialization: action.payload};
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNotifcation, resetNotification, setWebAppUrl } = NotificationSlice.actions

export default NotificationSlice.reducer