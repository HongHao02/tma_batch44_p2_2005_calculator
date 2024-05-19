import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '../../types/Product';

interface ProductInitialState {
    products: Product[];
    error: string | undefined | null;
    state: 'pending' | 'fulfilled' | 'rejected' | 'none';
}

const initialState: ProductInitialState = {
    products: [],
    error: null,
    state: 'none',
};

const cartStoreSlice = createSlice({
    name: 'cartStore',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const existsProduct: Product | undefined = state.products.find((pro) => pro.id == action.payload.id);
            let temp: Product = {
                id: action.payload.id,
                category: action.payload.category,
                description: action.payload.description,
                image: action.payload.image,
                price: action.payload.price,
                title: action.payload.title,
                quantity: 0,
            };
            if (existsProduct) {
                if (existsProduct.quantity) {
                    existsProduct.quantity++;
                }
                // state.products.push(existsProduct);
            } else {
                temp.quantity = 1;
                state.products.push(temp);
            }
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
        },
    },
});

export const { addProduct } = cartStoreSlice.actions;

export default cartStoreSlice.reducer;
