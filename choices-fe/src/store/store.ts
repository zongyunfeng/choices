import {configureStore} from '@reduxjs/toolkit'
import computationReducer from './computationSlice'

export const store = configureStore({
    reducer: {
        computation: computationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch