import { configureStore } from '@reduxjs/toolkit';
import commerceReducer from './features/commerceSlice.js';

export const store = configureStore({
  reducer: { commerce: commerceReducer },
});
