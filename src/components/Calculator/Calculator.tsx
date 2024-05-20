import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RestoreIcon from '@mui/icons-material/Restore';
import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { addInfix, deleteInfix, deleteAllInfix, calculate } from '../../features/Calculator/CalculatorSlice';
import { AppDispatch, RootState } from '../../app/store';

const Item = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'rgb(243 244 246 / var(--tw-bg-opacity))',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid rgb(156 163 175 / var(--tw-border-opacity));',
}));

const calculator_array = [
    '%',
    'CE',
    'C',
    'DEL',
    'NA',
    '(',
    ')',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    'NA',
    '0',
    '.',
    '=',
];

export default function Calculator() {
    const { infix, result } = useSelector((state: RootState) => state.calculator);
    const dispatch: AppDispatch = useDispatch();

    const handleDispatch = (cal: string) => {
        if (cal == '=') {
            dispatch(calculate());
        } else if (cal == 'DEL') {
            dispatch(deleteInfix());
        } else if (cal == 'C') {
            dispatch(deleteAllInfix());
        } else {
            dispatch(addInfix(cal));
        }
    };

    console.log('infix ', infix);
    return (
        <div className="flex gap-4 ">
            <div className="flex flex-col justify-center mx-auto xl:max-w-[300px]">
                <div className="flex flex-col w-full min-h-[100px] bg-slate-50 mb-4 text-xl p-2">
                    <div className="h-1/2 overflow-x-auto">{infix}</div>
                    <div className="flex-1">{result != null && result}</div>
                </div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {calculator_array.map((cal, index) => (
                            <Grid key={index} item xs={3}>
                                <Item onClick={() => handleDispatch(cal)} className="bg-gray-100">
                                    {cal}
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
            <div className="flex flex-col">
                <IconButton>
                    <RestoreIcon></RestoreIcon>
                </IconButton>
            </div>
        </div>
    );
}
