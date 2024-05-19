import { useSelector, useDispatch } from 'react-redux';
// import { styled } from '@mui/material/styles';
import { getFakeProduct } from '../../features/fakeStore/fakeStoreThunk';
import { AppDispatch, RootState } from '../../app/store';
import { Grid, Paper } from '@mui/material';
import RecipeReviewCard from '../../components/Item/ItemCard';
import { useEffect } from 'react';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const Home: React.FC = () => {
    const { products, error } = useSelector((state: RootState) => state.products);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getFakeProduct());
    }, []);
    return (
        <div className="mt-10">
            {error && <div>{error}</div>}
            <Grid container spacing={2}>
                {products.map((product, index) => {
                    return (
                        <Grid key={index} item md={3} sx={{maxHeight: '600px'}}>
                            <Paper>
                                <RecipeReviewCard key={index} product={product}></RecipeReviewCard>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};
export default Home;
