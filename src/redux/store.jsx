import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import SearchPubmedArticlesReducer from '../reducer/SearchPubmedArticlesReducer'
import NotificationReducer from '../reducer/NotificationReducer'
import GARDReducer from '../reducer/GARDReducer'

// const reducer = combineReducers({
//   searchPubmedArticles : SearchPubmedArticlesReducer,
//   notification : NotificationReducer
// })

const reducer = combineReducers({
  searchPubmedArticles : SearchPubmedArticlesReducer,
  notification : NotificationReducer,
  gardDiseases : GARDReducer,
})

export const store = configureStore({
  reducer
});