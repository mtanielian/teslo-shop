import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import CartList from '../../components/cart/CartList'
import MainLayout from '../../components/layouts/MainLayout'
import OrderSummary from '../../components/orderSummary/OrderSummary'
import { getOrderById } from '../../lib/order'
import { payOrder } from '../../services/order.services'

import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from "@mui/material"
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = ({ order }) => {
  const [ isPaying, setIsPaying ] = useState(false)
  const { _id, orderItems,  numberOfItems, subTotal, tax, total, shippingAddress, isPaid, createdAt } = order
  const { name, lastname, address, addressOptional, cp, city, countryCode, phone } = shippingAddress
  const router = useRouter()

  const onPay = async ({ details }) => {
    const { id: transactionId, status } = details
    
    if ( status !== 'COMPLETED' ) {
      return alert('No hay pago en Paypal');
    }
    
    setIsPaying(true)
    try {
      await payOrder({ orderId: _id, transactionId, isPaid: true })
      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert('Error');
    }
  }

  return (
    <MainLayout title='Resumen de orden' pageDescription="Resumen de la orden de compra">
      <Typography variant="h1" component='h1'>Orden {_id}</Typography>
      { isPaid  ? 
        <Chip 
          sx={{ my: 2 }}
          label='Pagada'
          variant='outlined'
          color='success'
          icon={ <CreditScoreOutlined /> }
        />
        :
        <Chip 
          sx={{ my: 2 }}
          label='Pendiente de pago'
          variant='outlined'
          color='error'
          icon={ <CreditCardOffOutlined /> }
        />
      }
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList cartValues={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography mb={2} variant="h2">Resumen ({numberOfItems > 1 ? `${numberOfItems} Productos` : '1 Producto'})</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant="subtitle1">Dirección de la entrega</Typography>
              </Box>
              <Typography>{name} {lastname}</Typography>
              <Typography>{address}</Typography>
              {addressOptional && <Typography>{addressOptional}</Typography>}
              <Typography>{countryCode} {city} ({cp})</Typography>
              <Typography>{phone}</Typography>
              <Divider sx={{mt:2, mb: 2}} />

              <OrderSummary orderValues={{ numberOfItems, subTotal, tax, total }} />
              <Divider />
              { ! isPaying &&
               (isPaid ? 
                <Chip 
                  sx={{ my: 2 }}
                  label='Pagada'
                  variant='outlined'
                  color='success'
                  icon={ <CreditScoreOutlined /> }
                />
                :
                <PayPalButtons 
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: total
                        },
                      }],
                    })
                  }}
              
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      onPay({ details })
                    });
                  }}
                />
               )}
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </MainLayout>           
  )
}

export const getServerSideProps = async ({ req, query }) => {
  let order = null
  try {
    const session = await getSession({ req })
    const { id } = query
    
    if (!session) {
      return {
        redirect: {
          destination: `/auth/login?p=/orders/${id}`,
          permanent: false
        }
      }
    }

    order = await getOrderById({ orderId: id, userId: session.user._id })

    if (!order) {
      return {
        redirect: {
          destination: '/orders/history',
          permanent: false
        }
      }
    }


  } catch (error) {
    console.log('Error getOrderByI: ', error)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      order    
    }
  }
}



export default OrderPage