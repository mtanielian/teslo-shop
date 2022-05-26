import NextLink from 'next/link'
import { Typography, Box, Grid, CardActionArea, CardMedia, Button, Link } from "@mui/material"
import ItemCounter from "../itemCounter/ItemCounter"
import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"


const CartList = ({ editable = false, cartValues }) => {
  const { cart, updateCartQty, removeCartProduct } = useContext(CartContext)
  const products = cartValues ? cartValues : cart
  
  const updateProductInCart = (product, qty) => {
    product.qty = qty
    updateCartQty(product)
  }
  
  const removeCart = (product) => {
    removeCartProduct(product)
  }

  return (
    <>
      {
       Boolean(products) && products.map( ({ _id, slug, title, image, qty, inStock, price, size }, index) => (
        <Grid container spacing={2} key={index} mb={2}>
          <Grid item xs={3}>
            <NextLink href={`/product/${slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    image={`/products/${image}`}
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant="subtitle1" >{title}</Typography>
              <Typography variant="subtitle2" >Talla <strong>{size}</strong></Typography>
              {editable 
                ? <ItemCounter stock={inStock} quantitySelected={qty} onCounterPress={(value) => updateProductInCart(cart[index], value) } />
                : <Typography variant='subtitle1'>{qty} Item</Typography>
              }
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant="subtitle1" >{`$${price}`}</Typography>
            {editable && <Button onClick={() => removeCart(cart[index])} variant="text" color="secondary">Remover</Button>}
          </Grid>
        </Grid>
        ))
      }
  </>)
}


export default CartList