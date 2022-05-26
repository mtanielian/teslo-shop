import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";
import MainLayout from "../components/layouts/MainLayout";
import ListProducts from "../components/products/ListProduct";
import { getAllProducts } from "../lib/product";
import { useProducts } from '../hooks/useProducts'
import LoadingFullScreen from '../components/loading/LoadingFullScreen'

export default function HomePage({ products2 }) {
  const { data, isLoading } = useProducts({ url: '/products' })
  const { data: session } = useSession()
  console.log({session})

  return (
    <MainLayout>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1}}>Todos los productos</Typography>
      {isLoading ? 
        <LoadingFullScreen />
        :
        <ListProducts products={data.products} />
      }
    </MainLayout>
  )
}

export const getServerSideProps = async () => {
  let products = {}

  try {
    products = await getAllProducts()
  } catch (error) {
    console.log('Error getAllProducts: ', error)
  }

  return {
    props: {
      products2: products
    }
  }
}