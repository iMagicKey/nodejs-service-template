import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter'
import { quotesApiSlice } from './slices/quotesApi'

const rootReducer = combineReducers({
    [counterSlice.name]: counterSlice.reducer,
    [quotesApiSlice.reducerPath]: quotesApiSlice.reducer,
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(quotesApiSlice.middleware)
        },
    })
}

