import LoadingFullScreen from '../../components/loading/LoadingFullScreen'
import AdminLayout from '../../components/layouts/AdminLayout'
import { DataGrid } from '@mui/x-data-grid'
import { useFetchData } from '../../hooks/useSWR'
import { CardMedia, Grid } from '@mui/material'
import { CategoryOutlined } from '@mui/icons-material'

const ProductsPage = () => {
  const { data, isLoading, error } = useFetchData({ url: '/admin/product' })

  if (isLoading) {
    return (
      <AdminLayout
      title='Dashboard' 
      subTitle='Listado de productos'
      icon={ <CategoryOutlined /> }
      >
        <LoadingFullScreen />
      </AdminLayout>  
    )
  }

  if (error) {
    return <>Ocurrio un error al cargar los datos</>
  }

  const rows = data.products.map((product, idx) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug
  }))

  const columns = [
    { 
      field: 'img', headerName: 'Foto', 
      renderCell: ({ row }) => {
        return (
          <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
            <CardMedia 
              component='img'
              alt={row.title}
              image={`${ process.env.NEXT_PUBLIC_HOST_NAME}products/${row.img}`}
              className='fadeIn'
            />
          </a>
        )
      }
    },
    { field: 'title', headerName: 'Nombre', width: 400, 
      renderCell: ({ row }) => {
        return (
          <a href={`/admin/product/${row.slug}`} target='_blank' rel='noreferrer'>
            {row.title}
          </a>
        )
      }
    },
    { field: 'gender', headerName: 'Género' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Stock' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 }
  ]

  return (
    <AdminLayout
      title='Dashboard' 
      subTitle='Listado de productos'
      icon={ <CategoryOutlined /> }
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

export default ProductsPage