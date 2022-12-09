import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
     name: 'user',
     initialState: {
          currentUser: null,
     },
     reducers: {
          getUserSuccess: (state, action) => {
               state.currentUser = action.payload;
          },
          getUserFailed: (state) => {
               state.currentUser = null;
          },
          logoutUserSuccess: (state) => {
               state.currentUser = null;
          }
     },
});

export const {
     getUserSuccess,
     getUserFailed,
     logoutUserSuccess
} = userSlice.actions;

export default userSlice.reducer;