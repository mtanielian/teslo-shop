import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from "@mui/material"

import CartList from "../../components/cart/CartList"
import MainLayout from "../../components/layouts/MainLayout"
import OrderSummary from "../../components/orderSummary/OrderSummary"
import { generateOrder } from '../../services/order.services'



const SummaryPage = () => {
  const [ hasError, setHasError ] = useState(false)
  const [ disabledBtnCO, setDisabledBtnCO ] = useState(false)
  const { user, address = {} } = useContext(AuthContext)
  const { name, lastname, address: address1, addressOptional, cp, city, countryCode, phone } = address
  const router = useRouter()

  useEffect(() => {
    if (!address1) {
      router.push('/checkout/address')    
    }
  }, [])
  
  const onCreateOrderPress = async () => {
    try {
      setHasError(false)
      setDisabledBtnCO(false)
      const { orderId } = await generateOrder({ userId: user._id })
      // TODO: Remover todo lo que hay en el state de cart y en las cookies
      router.replace(`/orders/${ orderId }`)
      
    } catch (error) {
      setHasError(true)
      
      console.log('Error createOrder: ', error)
    }
  }


  if (!address1) return <></>

  return (
    <MainLayout title='Resumen de compra' pageDescription="Resumen de la compra">
      <Typography variant="h1" component='h1'>Resumen de Compra</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography mb={2} variant="h2">Resumen (3 Productos)</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant="subtitle1">Dirección de la entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>
              <Typography>{name} {lastname}</Typography>
              <Typography>{address1} {addressOptional}</Typography>
              <Typography>{city} ({cp})</Typography>
              <Typography>{phone}</Typography>
              <Divider sx={{mt:2, mb: 2}} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Divider />
              <Box mt={3} display="flex" flexDirection="column">
                <Button 
                  fullWidth 
                  color='secondary' 
                  className="circular-btn" 
                  onClick={ onCreateOrderPress }
                  disabled={disabledBtnCO}
                >
                  Confirmar Orden
                </Button>
                <Chip 
                    color="error"
                    label='Ocurrio un error al generar la orden, intente en un momento'
                    sx={{ display: hasError ? 'flex':'none', mt: 2 }}
                />
              </Box>
            </CardContent>
           
          </Card>
        </Grid>
        
      </Grid>
    </MainLayout>           
  )
}

export default SummaryPage