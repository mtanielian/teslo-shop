import { useEffect, useContext } from "react"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { CartContext } from "../../contexts/CartContext"
import CartList from "../../components/cart/CartList"
import MainLayout from "../../components/layouts/MainLayout"
import OrderSummary from "../../components/orderSummary/OrderSummary"
import { useRouter } from "next/router"


const CartPage = () => {
  const { cart } = useContext(CartContext)
  const router = useRouter()

  useEffect(() => {
    if (!cart || cart.length === 0)
      router.replace('/cart/empty')

  }, [cart])

  if (!cart || cart.length === 0)
    return <></>

  return (
    <MainLayout title='Carrito de compras' pageDescription="Carrito de compras">
      <Typography variant="h1" component='h1'>Carrito</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography mb={2} variant="h2">Orden</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <OrderSummary />
              <Divider />
              <Box mt={3}>
                <Button 
                  fullWidth 
                  color='secondary' 
                  className="circular-btn"
                  href='/checkout/address'
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
           
          </Card>
        </Grid>
        
      </Grid>
    </MainLayout>           
  )
}

export default CartPage