import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import SearchPubmedArticlesReducer from '../reducer/SearchPubmedArticlesReducer'
import NotificationReducer from '../reducer/NotificationReducer'
import GARDReducer from '../reducer/GARDReducer'
import UserStateReducer from '../reducer/UserStateReducer'
import UserAEReducer from '../reducer/UserAEReducer'
import UserAgencyReducer from '../reducer/UserAgencyReducer'
import UserBookmarksReducer from '../reducer/UserBookmarksReducer'
import UserCommunityReducer from '../reducer/UserCommunityReducer'
import UserEventsReducer from '../reducer/UserEventsReducer'
import UserLatestDevelopmentsReducer from '../reducer/UserLatestDevelopmentsReducer'
import UserWishlistReducer from '../reducer/UserWishlistReducer'
import SearchClinicalTrialsReducer from '../reducer/SearchClinicalTrialsReducer'

// const reducer = combineReducers({
//   searchPubmedArticles : SearchPubmedArticlesReducer,
//   notification : NotificationReducer
// })

const reducer = combineReducers({
  searchPubmedArticles : SearchPubmedArticlesReducer,
  notification : NotificationReducer,
  gardDiseases : GARDReducer,
  searchClinicalTrials : SearchClinicalTrialsReducer,
  userState : UserStateReducer,
  userWishlist : UserWishlistReducer,
  
  userAE : UserAEReducer,
  userAgency : UserAgencyReducer,
  userBookmarks : UserBookmarksReducer,
  userCommunity : UserCommunityReducer,
  userEvents : UserEventsReducer,
  userLatestDevelopments : UserLatestDevelopmentsReducer,
})

export const store = configureStore({
  reducer
});