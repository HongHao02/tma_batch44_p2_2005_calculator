import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Formula from './Formular';

enum CalErrorValue {
    'ErrorSyntax' = 'ErrorSyntax',
}

interface CalculatorInitialState {
    infix: string;
    posfix: string[] | null | CalErrorValue;
    result: number | CalErrorValue | null;
    history: string[];
}

const initialState: CalculatorInitialState = {
    infix: '',
    posfix: null,
    result: null,
    history: [],
};

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        //indfix
        addInfix: (state, action: PayloadAction<string>) => {
            console.log('action.payload ', action.payload);
            state.infix = state.infix.concat(action.payload);
        },
        deleteInfix: (state) => {
            state.infix = state.infix.slice(0, state.infix.length - 1);
            state.result= null;
        },
        deleteAllInfix: (state) => {
            state.infix = '';
            state.result = null;
        },
        //calculate
        calculate: (state) => {
            state.history = [...state.history, state.infix];
            state.posfix = Formula.shuntingYard(state.infix);
            console.log('posfix ', state.posfix);
            if (state.posfix == null) {
                state.result = CalErrorValue.ErrorSyntax;
            } else {
                state.result = Formula.evaluatePostfix(state.posfix);
            }
        },
    },
});

export const { addInfix, deleteInfix, deleteAllInfix, calculate } = calculatorSlice.actions;

export default calculatorSlice.reducer;
