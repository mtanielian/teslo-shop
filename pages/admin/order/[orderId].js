import CartList from '../../../components/cart/CartList'
import AdminLayout from '../../../components/layouts/AdminLayout'
import OrderSummary from '../../../components/orderSummary/OrderSummary'
import { getOrderById } from '../../../lib/order'

import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from "@mui/material"
import { AttachMoneyOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = ({ order }) => {
  const { _id, orderItems,  numberOfItems, subTotal, tax, total, shippingAddress, isPaid, createdAt } = order
  const { name, lastname, address, addressOptional, cp, city, countryCode, phone } = shippingAddress

  return (
    <AdminLayout
      title='Dashboard' 
      subTitle='Resumen de la orden de compra'
      icon={ <AttachMoneyOutlined /> }
    >
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
              <Box display='flex' flexDirection='column'>
              { isPaid  ? 
                <Chip 
                  sx={{ my: 2, flex: 1 }}
                  label='Pagada'
                  variant='outlined'
                  color='success'
                  icon={ <CreditScoreOutlined /> }
                />
                :
                <Chip 
                  sx={{ my: 2, flex: 1 }}
                  label='Pendiente de pago'
                  variant='outlined'
                  color='error'
                  icon={ <CreditCardOffOutlined /> }
                />
              }
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </AdminLayout>           
  )
}

export const getServerSideProps = async ({ req, query }) => {
  let order = null
  const { orderId } = query
  try {
    order = await getOrderById({ orderId, checkUserOrderIds: false })

    if (!order) {
      return {
        redirect: {
          destination: '/admin/orders',
          permanent: false
        }
      }
    }


  } catch (error) {
    console.log('Error getOrderByI: ', error)
    return {
      redirect: {
        destination: '/admin/dashboard',
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