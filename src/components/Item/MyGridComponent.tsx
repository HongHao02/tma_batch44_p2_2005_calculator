import { Grid, Paper } from '@mui/material';
import clsx from 'clsx';

const MyGridComponent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={clsx('h-80', 'max-w-md')} sx={{ padding: '16px' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ex dicta quasi doloremque aliquid aspernatur ratione sapiente, vel commodi, officiis nostrum expedita quae nulla natus accusamus. Dolor quidem quisquam cumque?
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={clsx('h-80', 'max-w-md')} sx={{ padding: '16px' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem modi quam aperiam, tenetur amet quidem voluptas aut perferendis necessitatibus.
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={clsx('h-80', 'max-w-md')} sx={{ padding: '16px' }}>
          Item 3
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={clsx('h-80', 'max-w-md')} sx={{ padding: '16px' }}>
          Item 4
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyGridComponent;
