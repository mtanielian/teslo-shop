import { Grid } from "@mui/material"
import ListProductItem from "./ListProductItem"

const ListProducts = ({ products = [] }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => <ListProductItem key={product._id} product={product} />)}
    </Grid>
  )
}

export default ListProducts