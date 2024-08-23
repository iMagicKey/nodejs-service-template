import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

// `buildCreateSlice` позволяет нам создавать slice с асинхронными thunk.
export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})
