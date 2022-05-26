import NextLink from 'next/link'
import MainLayout from "../../components/layouts/MainLayout"
import { Box, Link, Typography } from "@mui/material"
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

const EmptyCardPage = () => {
  return (
    <MainLayout title='Carrito de compras' pageDescription='Carrito de compras vacio'>
    <Box 
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='calc(100vh - 200px)'
      sx={{ flexDirection: { xs: 'column', sm: 'row'} }}
    >
      <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 100 }} />   
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography>Tu carrito esta vacio</Typography>
        <NextLink href='/' passHref>
          <Link typography='h4' color='secondary'>
            Regresar
          </Link>
        </NextLink>
      </Box>
    </Box>
  </MainLayout>
  )
}

export default EmptyCardPage