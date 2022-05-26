import { useContext, useState } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { AuthContext } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { isEmail } from '../../utils/validations'
import { ErrorOutline } from '@mui/icons-material'
import { registerUser } from '../../services/user.services'


const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [ showError, setShowError ] = useState(false)
  const { setLogged } = useContext(AuthContext)
  const router = useRouter()

  const onSubmit = async (data) => {
    const {username, email, password } = data
    try {
      //const token = await registerUser(data)
      //setLogged(token)
      //const destination = router.query.p || '/'
      //router.replace(destination)

      await registerUser({ username, email, password })
      await signIn('credentials', { email, password })

    } catch (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Box width='500px' display='flex' justifyContent='center'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Resgitrarse</Typography>
              <Chip 
                color='error'
                variant='outlined'
                label='Error con los datos ingresados'
                className='fadeIn'
                icon={ <ErrorOutline /> }
                sx={{ display: showError ? 'flex' : 'none', justifyContent: 'left' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Usuario' 
                variant='filled' 
                fullWidth 
                {
                  ...register('username', {
                    required: 'El usuario es requerido',
                    minLength: { value: 3, message: 'Minimo 3 caracteres' }
                  })
                }
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Correo' 
                variant='filled' 
                fullWidth 
                {
                  ...register('email', {
                    required: 'El email es requerido',
                    validate: isEmail
                  })
                }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Contraseña' 
                type='password' 
                variant='filled' 
                fullWidth 
                {
                  ...register('password', {
                    required: 'Campo requerido',
                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                  })
                }
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' fullWidth>Crear Cuenta</Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink 
                href={ router.query.p ? `/auth/login?p=${router.query.p}` : `/auth/login` }
                passHref
              >
                <Link underline='always'>¿Ya tenes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps = async ({req, query}) => {
  const { p = '/' } = query
  const session = await getSession({ req })
  
  if (session) {
    return {
      redirect: {
        destination: p,
        permanent: false
      }
    }
  }

  return {
    props: {
      
    }
  }
}

export default RegisterPage