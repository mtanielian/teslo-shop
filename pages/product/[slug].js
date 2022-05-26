import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import MainLayout from "../../components/layouts/MainLayout"
import { CartContext } from '../../contexts/CartContext'
import { Box, Button, Chip, Grid, IconButton, Typography } from "@mui/material"
import { getProductBySlug, getAllSlugProducts } from "../../lib/product"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SliderImages from "../../components/sliderImages/SliderImages";
import SizeSelector from "../../components/sizeSelector/SizeSelector";
import ItemCounter from '../../components/itemCounter/ItemCounter';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';


const ProductPage = ({ product = {} }) => {
  const [sizeSelected, setSizeSelected] = useState()
  const [quantitySelected, setQuantitySelected] = useState(1)
  const {_id, title, description, price, sizes, images, inStock } = product
  const { addItem, cart } = useContext(CartContext)
  const router = useRouter()

  const onSizeSelectorPress = (size) => {
    setSizeSelected(size)
  }

  const onCounterPress = (qty) => {
    setQuantitySelected(qty)
  }

  const addCart = () => {
    if (!sizeSelected) return 

    const item = {
      _id,
      title,
      price,
      image: images[0],
      size: sizeSelected,
      inStock,
      qty: quantitySelected
    }

    addItem( item )

  }

  const buyNow = () => {
    if (cart.length > 0) {
      router.push('/cart')    
    }
  }

  return (
    <MainLayout>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <SliderImages images={images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>{title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${price}`}</Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter onCounterPress={onCounterPress} quantitySelected={quantitySelected} stock={inStock} />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Talle {sizeSelected}</Typography> 
              <SizeSelector sizes={sizes} onSizeSelectorPress={onSizeSelectorPress} sizeSelected={sizeSelected} />
            </Box>
            {inStock 
              ? 
              <>
                <Button color='secondary' 
                  disabled={!sizeSelected} sx={{marginTop: 3}} 
                  className="circular-btn" startIcon={ <ShoppingCartOutlinedIcon /> }
                  onClick={addCart}
                >
                  Agregar al carrito
                </Button>
                <Button color='secondary' variant='outlined' 
                  disabled={cart && cart.length === 0} sx={{marginTop: 3, borderRadius: '30px'}}  
                  startIcon={ <PaymentOutlinedIcon /> }
                  onClick={buyNow}
                >
                  Comprar ahora
                </Button>
              </>
              :
              <Chip color='error' variant='outlined' label='Sin Stock Disponible' />
            }
            <Box sx={{ marginTop: 3}}>
              <Typography variant='subtitle2'>
                {description}
              </Typography>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </MainLayout>
  )
}

export default ProductPage



export const getStaticPaths = async (ctx) => {
  const products = await getAllSlugProducts()
  const paths = products.map( ({slug}) => ( 
    { params: { slug } }
  ))

  return {
    paths,
    fallback: "blocking"
  }
}


export const getStaticProps = async ({ params }) => {
  const { slug } = params
  let product = {}

  try {
    product = await getProductBySlug({ slug })
  } catch (error) {
    console.log('Error getProductBySlug: ', error)
  }
  
  if (!Boolean(product)) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 1 vez cada 24hs
  }
}



/*
export const getServerSideProps = async ({ params }) => {
  const { slug } = params
  let product = {}

  try {
    product = await getProductBySlug({ slug })
  } catch (error) {
    console.log('Error getProductBySlug: ', error)
  }
  
  if (!Boolean(product)) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}
*/