//import { getProductsByGender } from "../../services/product.services"
import { Typography } from "@mui/material"
import MainLayout from "../../components/layouts/MainLayout"
import ListProducts from "../../components/products/ListProduct"
import { getProductsByGender } from "../../lib/product"

const TEXT_BY_GENDER = {
  men: { title: 'Hombres', description: 'Producto para ellos' },
  women: { title: 'Mujeres', description: 'Producto para ellas' },
  kid: { title: 'Niños', description: 'Producto para niños' },
}

const ProductsPage = ({ gender, products }) => {
  const { title = '', description = '' } = TEXT_BY_GENDER[gender] || {}
  return (
    <MainLayout>
      <Typography variant="h1" component='h1'>{title}</Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <ListProducts products={products} />
    </MainLayout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { gender } = params
  let products = []
  if (!Boolean(gender)) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  try {
    products = await getProductsByGender({ gender })
  } catch (error) {
    console.log('Error al cargar los productos: ', error)
  }


  return {
    props: {
      gender,
      products
    }
  }
}


export default ProductsPage