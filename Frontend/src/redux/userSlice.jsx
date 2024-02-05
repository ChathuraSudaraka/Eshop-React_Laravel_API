// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: true,
    loggedIn: false,
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
