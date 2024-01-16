import { configureStore } from '@reduxjs/toolkit';
import { elementApi } from './dataSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [elementApi.reducerPath]: elementApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(elementApi.middleware),
});

setupListeners(store.dispatch);
