import * as request from '../../utils/httpRequests'
import { createAsyncThunk } from '@reduxjs/toolkit';

// export const getTodoList = createAsyncThunk<Todo[], void, { rejectValue: string }>(
//     'todos/getTodoList',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await request.getTodosRandom(3, 10);
//             return response.todos;
//         } catch (error) {
//             // Adjust error handling to match your API's error structure
//             return rejectWithValue('Failed to fetch todos');
//         }
//     },
// );

export const getFakeProduct = createAsyncThunk('products/getFakeProduct', async (_, { rejectWithValue }) => {
    try {
        const response = await request.getFakeProduct();
        console.log("resonse from thunk ", response);
        return response;
    } catch (error) {
        // Adjust error handling to match your API's error structure
        return rejectWithValue('Failed to fetch fake store');
    }
});