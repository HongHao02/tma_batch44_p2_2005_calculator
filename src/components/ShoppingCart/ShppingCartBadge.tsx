import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Alert,
    AlertTitle,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useState } from 'react';
import Product from '../../types/Product';
import Recipe from './Recipe';

//custom MUI
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

interface ItemCheckOutProps {
    product: Product;
    onCheckOut: (product: Product, checked: boolean) => void;
}
const ItemCheckOut: React.FC<ItemCheckOutProps> = ({ product, onCheckOut }) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onCheckOut(product, event.target.checked);
    };
    return (
        <div className={`flex items-center gap-4 border-b-gray-400 border-b-2 w-full h-full ${checked ? 'bg-green-200': ''}`}>
            <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
            <div className="w-5 flex-shrink">
                <img src={product.image} alt={`product_${product.id}`} className="object-fill" />
            </div>
            <div>Title: {product.title}</div>
            <div>Price: {product.price}</div>
            <div>Quantity: {product.quantity}</div>
        </div>
    );
};

export default function CustomizedBadges() {
    const cartStoreReducer = useSelector((state: RootState) => state.cartStore);
    const [open, setOpen] = useState<boolean>(false);
    const [isCheckOut, setIsCheckOut] = useState<boolean>(false);
    const [checkOutList, setCheckOutList] = useState<Product[]>([]);
    const [showAlert, setShowAlert] = useState(false);

    const onCheckOut = (product: Product, checked: boolean) => {
        console.log('product ', product, checked);
        if (checked) {
            setCheckOutList((prev: Product[]) => [...prev, product]);
        } else {
            setCheckOutList((prev: Product[]) => prev.filter((pro: Product) => pro.id != product.id));
        }
    };
    console.log('check out list ', checkOutList);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCheckOutList([])
    };

    const handleCheckOut = () => {
        setIsCheckOut(!isCheckOut);
        if (checkOutList.length > 0) {
            setShowAlert(false);
        } else {
            setShowAlert(true);
        }
    };
    return (
        <div>
            <IconButton aria-label="cart" onClick={handleClickOpen}>
                <StyledBadge badgeContent={cartStoreReducer.products.length} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose}>
                {showAlert && (
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        No product to check out
                    </Alert>
                )}
                <DialogTitle>{'Your Shopping Cart'}</DialogTitle>
                <DialogContent>
                    <div className='bg-gray-50'>
                        {cartStoreReducer.products.map((product, index) => {
                            return (
                                <div key={index} className='max-h-20'>
                                    <ItemCheckOut product={product} onCheckOut={onCheckOut}></ItemCheckOut>
                                </div>
                            );
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCheckOut} color="primary">
                        Check out
                    </Button>
                    <Button onClick={handleClose} color="error" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
                <div>{isCheckOut && <Recipe checkOutList={checkOutList}></Recipe>}</div>
            </Dialog>
        </div>
    );
}
