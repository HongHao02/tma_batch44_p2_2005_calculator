import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Product from '../../types/Product';
import { ShoppingCartRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addProduct } from '../../features/cartStore/cartStoreSlice';
import { Collapse } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
interface ItemProps {
    children?: unknown;
    product: Product;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ product }: ItemProps) {
    const [expanded, setExpanded] = React.useState(false);

    const [content, setContent] = React.useState<string>(product.description.slice(0, 100));

    const handleShow = () => {
        if (content.length <= 100) {
            setContent(product.description);
        } else {
            setContent(product.description.slice(0, 100));
        }
    };
    // const cartStore = useSelector((state: RootState) => state.cartStore);
    const dispatch: AppDispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader
                sx={{height: '100px'}}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        TMA
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={product.title}
                subheader={`Price: $${product.price}`}
            />

            <CardMedia component="img" image={product.image} alt="Paella dish" sx={{maxHeight: '350px', objectFit: 'fill'}}/>

            <CardContent>
                <Typography variant="body2" color="text.secondary" className='text-justify'>
                    {product.description.length > 100 ? (
                        <>
                            {content}
                            <button className="font-bold" onClick={handleShow}>
                                {content.length <= 100 ? '...Show more' : '...Show less'}
                            </button>
                        </>
                    ) : (
                        <>{product.description}</>
                    )}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => dispatch(addProduct(product))}>
                    <ShoppingCartRounded />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add
                        chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8
                        minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan.
                        Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often
                        until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups
                        chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without
                        stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                        reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring,
                        until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels
                        that don&apos;t open.)
                    </Typography>
                    <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
