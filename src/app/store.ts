import { configureStore } from '@reduxjs/toolkit';

import calculatorReducer from '../features/Calculator/CalculatorSlice';

const store = configureStore({
    reducer: {
        calculator: calculatorReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;