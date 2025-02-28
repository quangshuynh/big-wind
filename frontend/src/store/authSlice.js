// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    username: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;