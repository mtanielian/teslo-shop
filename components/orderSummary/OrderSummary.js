import { Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"

const OrderSummary = ({ orderValues }) => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext)
  const summary = orderValues ? orderValues : { numberOfItems, subTotal, tax, total }

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Nro. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{summary.numberOfItems}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Sub total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`$${summary.subTotal}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos ({process.env.NEXT_PUBLIC_TAX_RATE }%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`$${summary.tax}`}</Typography>
      </Grid>
      <Grid item xs={6} mt={2}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'  mt={3}>
        <Typography variant="subtitle1">{`$${summary.total}`}</Typography>
      </Grid>
    </Grid>
  )
}

export default OrderSummary