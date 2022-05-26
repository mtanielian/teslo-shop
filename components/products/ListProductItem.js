import { useState } from 'react'
import NextLink from 'next/link'
import { Box, Card, CardMedia, Grid, Typography, CardActionArea, Link, Chip } from '@mui/material'


const ListProductItem = ({ product = {} }) => {
  const [isHover, setIsHover] = useState(false)
  //const [isImageLoaded, setIsImageLoaded] = useState(false)
  const { title, images = [], price, slug, inStock } = product

  return (
    <Grid item xs={4} 
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Card sx={{ maxWidth: 345 }}>
        <NextLink href={`/product/${slug}`} passHref >
          <Link>
            <CardActionArea>
              {!inStock &&
                <Chip
                  color='primary'
                  label='Sin Stock'
                  sx={{ position: 'absolute', top: '10px', left: '10px', zIndex: 999 }}
                />
              }
              <CardMedia
                component='img'
                className='fadeIn'
                image={isHover ? `/products/${images[1]}` : `/products/${images[0]}`}
                alt={title}
                /*onLoad={() => setIsImageLoaded(true)}*/
              />
            </CardActionArea>
          </Link>
        </NextLink>
        <Box sx={{ mt: 1 /* , display: isImageLoaded ? 'block' : 'none' */}} className='fadeIn'>
          <Typography gutterBottom variant='h5' fontWeight={500}>
            {title}
          </Typography>
          <Typography variant='h6' fontWeight={300}>
            {`$${price}`}
          </Typography>
        </Box>
      </Card>
    </Grid>
  )
}

export default ListProductItem