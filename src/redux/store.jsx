import { configureStore } from '@reduxjs/toolkit'
import searchPubmedArticlesReducer from '../reducer/searchPubmedArticlesReducer'

export const store = configureStore({
  reducer: {
    searchPubmedArticles : searchPubmedArticlesReducer,
  },
})