import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import {
  Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, 
  FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField 
} from '@mui/material'
import { getProductBySlug } from '../../../lib/product'
import { useEffect, useState } from 'react'
import { updateProductById, createProduct } from '../../../services/product.services'


const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']

const ProductAdminPage = ({ product }) => {
  console.log({ product })
  const [ isSaving, setIsSaving ] = useState(false)
  const [ newTagValue, setNewTagValue ] = useState('')
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors }, getValues, setValue } = useForm({
    defaultValues: product
  })
 
  useEffect(() => {
    const subscription = watch( ( value, { name, type } ) => {
      if (name === 'title') {
        const val = value.title || ''
        const newSlug = val.replaceAll(' ', '_').replaceAll("'", '').trim().toLocaleLowerCase()
        setValue('slug', newSlug, { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  
  }, [watch, setValue])

  const onChangeSize = (size) => {
    const currentSizes = getValues('sizes') || []
    if ( currentSizes.includes(size) ) {
      return setValue('sizes', currentSizes.filter(s => s !== size), { shouldValidate: true })
    }

    setValue('sizes', [...currentSizes, size], { shouldValidate: true })
  }
 
  const onNewTag = () => {
    const currentTags = getValues('tags') || []
    const newTag = newTagValue.trim().toLocaleLowerCase()
    
    if (!currentTags.includes(newTag)) {
      setValue('tags', currentTags.concat(newTag))
    }
    setNewTagValue('')
  }

  const onDeleteTag = ( tag ) => {
    setValue('tags', getValues('tags').filter(t => t !== tag), { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    setIsSaving(true)
    try {
      let product = null
      console.log(data._id)
      if (data._id) {
        product = await updateProductById(data)
      } else {
        data.images = ['imagen01.png', 'imagen02.png']
        product = await createProduct(data)
      }


      if (product) {
        router.replace(`/admin/product/${ data.slug }`);
        router.reload()
      }

      setIsSaving(false)
    
    } catch (error) {
      setIsSaving(false)
      console.log('Error update / create product: ', error)
    }
  }

  return (
    <AdminLayout 
      title={'Producto'} 
      subTitle={`Editando: ${ product.title }`}
      icon={ <DriveFileRenameOutline /> }
    >
      <form onSubmit={ handleSubmit( onSubmit ) }>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button 
            color="secondary"
            startIcon={ <SaveOutlined /> }
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={ 6 }>
            <TextField
              label="Título"
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              {
                ...register('title', {
                  required: 'Este campo es obligatorio',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' }
                })
              }
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Descripción"
              variant="filled"
              fullWidth 
              multiline
              sx={{ mb: 1 }}
              {
                ...register('description', {
                  required: 'El campo es requerido',
                  minLength: { value: 10, message: 'Minimo 10 caracteres' }
                })
              }
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              label="Inventario"
              type='number'
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              {
                ...register('inStock', {
                  required: 'El campo es requerido',
                  minLength: { value: 0, message: 'El valor minimo tiene que ser cero' }
                })
              }
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />                        
            <TextField
              label="Precio"
              type='number'
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              {
                ...register('price', {
                  required: 'El campo es requerido',
                  minLength: { value: 0, message: 'El valor minimo tiene que ser cero' }
                })
              }
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup row 
                value={ getValues('type') }
                onChange={ ({ target }) => setValue('type', target.value, { shouldValidate: true }) }
              >
                {validTypes.map( option => (
                  <FormControlLabel 
                    key={ option }
                    value={ option }
                    control={ <Radio color='secondary' /> }
                    label={ capitalize(option) }
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup row 
                value={ getValues('gender') }
                onChange={ ({ target }) => setValue('gender', target.value, { shouldValidate: true }) }
              >
              { validGender.map( option => (
                <FormControlLabel 
                  key={ option }
                  value={ option }
                  control={ <Radio color='secondary' /> }
                  label={ capitalize(option) }
                />
              )) }
              </RadioGroup>
            </FormControl>
            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {
                validSizes.map(size => (
                  <FormControlLabel 
                    key={size} 
                    control={<Checkbox checked={ getValues('sizes') ? getValues('sizes').includes(size) : false } />} 
                    label={ size } 
                    onChange={ () => onChangeSize(size) }
                  />
                ))
              }
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={ 6 }>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {
                ...register('slug', {
                  required: 'Campo obligatorio',
                  validate: (val) => val.trim().includes(' ') ? 'No se adminten espacios' : undefined
                })
              }
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />
            <TextField
              label="Etiquetas"
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
              value={ newTagValue }
              onChange={ ({target, code }) => setNewTagValue(target.value, code) }
              onKeyUp={ ({ code })=> code === 'Space' ? onNewTag() : undefined }
            />
            <Box 
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues('tags') && getValues('tags').length > 0 && getValues('tags').map((tag) => {
              return (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={ () => onDeleteTag(tag)}
                  color="primary"
                  size='small'
                  sx={{ ml: 1, mt: 1}}
                />
              )})}
            </Box>
            <Divider sx={{ my: 2  }}/>                        
            <Box display='flex' flexDirection="column">
              <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={ <UploadOutlined /> }
                sx={{ mb: 3 }}
              >
                Cargar imagen
              </Button>
              <Chip 
                label="Es necesario al 2 imagenes"
                color='error'
                variant='outlined'
              />
              <Grid container spacing={2}>
                { product.images && product.images.map( img => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia 
                        component='img'
                        className='fadeIn'
                        image={ `/products/${ img }` }
                        alt={ img }
                      />
                      <CardActions>
                        <Button fullWidth color="error">
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { slug = ''} = query;

  if ( slug === 'new' ) {
    return {
      props: {
        product: {}
      }
    } 
  }
  console.log({slug})

  const product = await getProductBySlug({ slug })
  console.log(product)
  if ( !product ) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      }
    }
  }


  return {
    props: {
      product
    }
  }
}


export default ProductAdminPage