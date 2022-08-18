import { configureStore } from '@reduxjs/toolkit'
import OnlinesSlice from './OnlinesSlice'
import UserSlice from './UserSlice'

export const store = configureStore({
  reducer: {
    onlines: OnlinesSlice,
    user: UserSlice,
  },
})