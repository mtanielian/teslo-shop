import { Box, Typography } from "@mui/material";
import MainLayout from "../../components/layouts/MainLayout";
import ListProducts from "../../components/products/ListProduct";
import { getProductsBySearch, getAllProducts } from "../../lib/product";
import { useProducts } from '../../hooks/useProducts'
import LoadingFullScreen from '../../components/loading/LoadingFullScreen'

export default function SearchPage({ products, foundProducts = true, query }) {
  // const { data, isLoading } = useProducts({ url: '/products' })
  
  return (
    <MainLayout>
      <Typography variant='h1' component='h1'>Busqueda</Typography>
      { foundProducts 
        ? <Typography variant='h2' sx={{ mb: 1}}>Productos encontrados: {products.length}</Typography>
        : (
          <Box>
            <Typography variant='h2' sx={{ mb: 1}}>No se encontraron productos para la busqueda</Typography>
            <Typography variant='h2' sx={{ mb: 1}} color='secondary'> {query}</Typography>
          </Box>
        )
        
      }
      
      
      <ListProducts products={products} />
      
    </MainLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { query = '' } = params
  let products = {}
  let foundProducts = true

  try {
    products = await getProductsBySearch({ searchText: query })
    if (!products || products.length === 0) {
      foundProducts = false
      products = await getAllProducts({ searchText: query })
    }
  } catch (error) {
    console.log('Error getAllProducts: ', error)
  }

  return {
    props: {
      products: products,
      foundProducts,
      query
    }
  }
}