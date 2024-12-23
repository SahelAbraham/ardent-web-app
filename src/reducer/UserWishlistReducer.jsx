import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wishlist: []
}

export const UserWishlistResultsSlice = createSlice({
  name: 'userWishlistResults',
  initialState,
  reducers: {
    setUserWishlist: (state, action) => {
        state.wishlist = action.payload;
    },
    addUserWishlist: (state, action) => {
        state.wishlist = state.wishlist.concat(action.payload);
    },
    incrementVoteUserWishlist: (state, action) => {
        return {
            ...state,
            wishlist: state.wishlist.map((item) =>
              item.id === action.payload.id
                ? { ...item.num_votes, ...(action.payload.num_votes + 1)}
                : item)
    }},
    resetUserWishlist: (state, action) => {
      state.wishlist = [];
  }
  },
})

// Action creators are generated for each case reducer function
export const { setUserWishlist, resetUserWishlist, addUserWishlist, incrementVoteUserWishlist } = UserWishlistResultsSlice.actions

export default UserWishlistResultsSlice.reducer