import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Product from '../../types/Product';

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

// function priceRow(qty: number, unit: number) {
//     return qty * unit;
// }

// function createRow(desc: string, qty: number, unit: number) {
//     const price = priceRow(qty, unit);
//     return { desc, qty, unit, price };
// }

// interface Row {
//     desc: string;
//     qty: number;
//     unit: number;
//     price: number;
// }
interface RecipeProps {
    checkOutList: Product[];
}
function subtotal(items: readonly Product[]) {
    return items
        .map(({ price, quantity }) => ({ price, quantity }))
        .reduce((sum, cur) => sum + parseFloat(cur.price) * (cur?.quantity ?? 1), 0);
}

export default function Recipe({ checkOutList }: RecipeProps) {
    const invoiceSubtotal = subtotal(checkOutList);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Desc</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell align="right">Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {checkOutList.map((pro: Product) => (
                        <TableRow key={pro.title}>
                            <TableCell>{pro.title}</TableCell>
                            <TableCell align="right">{pro.quantity}</TableCell>
                            <TableCell align="right">{pro.price}</TableCell>
                            <TableCell align="right">
                                {ccyFormat(parseFloat(pro.price) * (pro?.quantity ?? 1))}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
