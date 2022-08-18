import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const OnlinesSlice = createSlice({
    name: 'onlines',
    initialState,
    reducers: {
        setOnlines: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setOnlines } = OnlinesSlice.actions

export default OnlinesSlice.reducer