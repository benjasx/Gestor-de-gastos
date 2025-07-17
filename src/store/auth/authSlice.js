import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'checking', // 'authenticated', 'not-authenticated'
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
    errorMessage: null,
    errorCode: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.displayName = payload.displayName;
            state.email = payload.email;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
            state.errorCode = null;
        },
        logout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
            state.errorCode = payload?.errorCode;        
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
