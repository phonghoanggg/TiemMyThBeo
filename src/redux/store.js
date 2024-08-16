import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slides/userSlide'
import productReducer from './slides/productSilde'
export const store = configureStore({
  reducer: {
    product:productReducer,
    user:userReducer,
  },
})