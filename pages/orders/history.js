import NextLink from 'next/link'
import MainLayout from "../../components/layouts/MainLayout"
import { DataGrid } from "@mui/x-data-grid"
import { Chip, Grid, Typography, Link } from "@mui/material"
import { getSession } from 'next-auth/react'
import { getOrdersByUserId } from '../../lib/order'


const HistoryPage = ({ orders = [] }) => {
 
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'fullname', headerName: 'Nombre', width: 300 },
    { 
      field: 'paid', 
      headerName: 'Pagado', 
      description: 'Informa si la orden fue pagada o no',
      width: 200,
      renderCell: (params) => {
        return params.row.paid 
          ? <Chip variant='outlined' color='success' label='Pagada' />
          : <Chip variant='outlined' color='error' label='No Pagada' />
      }
    },
    { 
      field: 'orderLink', 
      headerName: 'Orden', 
      description: 'Ir a la informacion de la orden',
      width: 200,
      sortabled: false,
      renderCell: (params) => {
        return ( <NextLink href={`/orders/${params.row.orderId} `} passHref>
            <Link underline='always'>Ver orden</Link>
          </NextLink>)
      }
    },
  ];
  
  const rows = orders.map( (order, idx) => ({
    orderId: order._id,
    id: idx + 1,
    paid: order.isPaid,
    fullname: `${ order.shippingAddress.name } ${ order.shippingAddress.lastname }`,
  }))

  return (
    <MainLayout title='Historial de Compras' pageDescription="Historial de las ordenes de compra">
      <Typography variant="h1" component="h1">Historial de Compras</Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%'}}>
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />


        </Grid>


      </Grid>
    </MainLayout>
  )
}


export const getServerSideProps = async ({ req }) => {
  let orders = []
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false
      }
    }
  }

  try {
    orders = await getOrdersByUserId({ userId: session.user._id })
  } catch (error) {
    console.log('Error getOrdersByUserId: ', error)

    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      orders
    }
  }
}

export default HistoryPage