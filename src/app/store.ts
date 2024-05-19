import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../features/fakeStore/fakeStoreSlice'
import cartStoreReducer from '../features/cartStore/cartStoreSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
        cartStore: cartStoreReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;