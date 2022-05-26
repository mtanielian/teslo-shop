import AdminLayout from '../../components/layouts/AdminLayout'
import { AttachMoneyOutlined } from '@mui/icons-material'
import { useFetchData } from '../../hooks/useSWR'
import { Chip, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const OrdersPage = () => {
  const {data, error, isLoading} = useFetchData({ url: '/admin/order' })

  if (isLoading) {
    return <>Cargando......</>
  }

  if (error) {
    return <>Ocurrio un error al obtener las ordenes</>
  }
console.log(data)
  const rows = data.orders.map((order, idx) => ({
    id: idx + 1,
    orderId: order._id,
    isPaid: order.isPaid,
    total: order.total,
    numberOfItems: order.numberOfItems,
    createdAt: order.createdAt,
    email: order.user.email,
    username: order.user.username
  }))

  const columns = [
    { field: 'orderId', headerName: 'OrderID', width: 250 },
    { field: 'email', headerName: 'Correo', width: 300 },
    { field: 'username', headerName: 'Nombre Completo', width: 300 },
    { field: 'total', headerName: 'Monto total', width: 100 },
    { field: 'isPaid', headerName: 'Pagada', width: 150,
      renderCell: ({ row }) => {
        return (
          row.isPaid 
            ? <Chip variant='outlined' label="Pagada" color="success" /> 
            : <Chip variant='outlined' label="Pendiente" color="error" /> 
        )
      }
    },
    { field: 'numberOfItems', headerName: 'Nro. Productos', width: 200 },
    { field: 'goOrder', headerName: 'Ver Orden', width: 100,
      renderCell: ({ row }) => {
        return (
          <a href={`/admin/order/${row.orderId}`} target='_blank' rel='noreferrer'>
            Orden
          </a>
        )
      }
  
    },
    { field: 'createdAt', headerName: 'Creada en', width: 300 }
  ]


  return (
    <AdminLayout
      title='Dashboard' 
      subTitle='Listado de ordenes'
      icon={ <AttachMoneyOutlined /> }
    >
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
    </AdminLayout>
  )
}

export default OrdersPage