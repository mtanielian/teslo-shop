import { useContext } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import MainLayout from '../../components/layouts/MainLayout'
import { Button, Grid, MenuItem, TextField, Typography, Box, FormControl } from '@mui/material'
import { countries } from '../../utils/countries'
import { saveAddress } from '../../services/address.services'
import { getAddressByUserId } from '../../lib/address'

const AddressPage = ({ addressData = {} }) => {
  const router = useRouter()
  const { user, setAddress } = useContext(AuthContext)
  const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues: addressData })

  const onSubmit = async (data) => {
    try {
      const res = await saveAddress({ userId: user._id, ...data })
      setAddress(res)

      router.push('/checkout/summary')
    } catch (error) {
      console.log('Error saveAddress: ', error)
    }

  }

  return (
    <MainLayout>
      <Typography variant="h1" component='h1'>Checkout</Typography>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Grid container  spacing={2}>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              label="Nombre" 
              variant="filled" 
              { ...register('name', {
                required: 'El nombre es obligatorio',
                minLength: { value: 3, message: 'Minimo 3 caracteres' }
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              label="Apellido" 
              variant="filled" 
              { ...register('lastname', {
                required: 'El apellido es obligatorio',
                minLength: { value: 3, message: 'Minimo 3 caracteres' }
              })}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              label="Dirección" 
              variant="filled" 
              { ...register('address', {
                required: 'La direccion es obligatoria',
                minLength: { value: 10, message: 'Minimo 10 caracteres' }
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              label="Dirección 2 (opcional)" 
              variant="filled" 
              { ...register('addressOptional')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              label="Código Postal" 
              variant="filled"
              { ...register('cp', {
                required: 'El codigo postal es obligatorio',
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })}
              error={!!errors.cp}
              helperText={errors.cp?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              label="Ciudad" 
              variant="filled" 
              { ...register('city', {
                required: 'La ciudad es obligatoria',
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={6}>                
            <FormControl fullWidth >
              <TextField
                select
                variant="filled"
                { ...register('countryCode', {
                  required: 'El pais es obligatorio'
                })}
                error={!!errors.countryCode}
                defaultValue={ addressData?.countryCode ? addressData.countryCode : countries[0].code }
              >
                { countries.map( ({ code, name }) => 
                  <MenuItem key={code} value={code}>{name}</MenuItem>
                )}
              </TextField>
            </FormControl>
            
          </Grid>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              label="Teléfono" 
              variant="filled" 
              { ...register('phone', {
                required: 'El telefono es obligatorio',
                minLength: { value: 8, message: 'Minimo 8 caracteres' }
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5}} display='flex' justifyContent='center'>
          <Button type='submit' className="circular-btn" color='secondary'>
            Revisar Pedido
          </Button>
        </Box>
      </form>
    </MainLayout>
  )
}

export const getServerSideProps = async ({ req }) => {
  let addressData = req.cookies.address ? JSON.parse(req.cookies.address) : ''

  const session = await getSession({ req })

  if (session.user && !addressData) {

    addressData = await getAddressByUserId({ userId: session.user._id })
    if (addressData)
      req.cookies.address =  JSON.stringify(addressData)
    
  }
  
   return {
    props: {
      addressData
    }
  }
}


// Aplico middleware para manejo de token NextJS v >= 12 
// EJ. de Validacion token NextJS v <= 11
/*
export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies
  let isValid = true

  try {
    const { user } = jwt.decode(token)
    if (!Boolean(user)) {
      isValid = false
    }

  } catch (error) {
    isValid = false
  }
  
  if (!isValid) {
    return {
      redirect: {
        destination: '/auth/login?p=/checkout/address',
        permanent: false
      }
    }
  }

  return {
    props: {
      
    }
  }
}
*/

export default AddressPage