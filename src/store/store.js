import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { gastosSlice } from './gastos'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        gastos: gastosSlice.reducer
    },
})