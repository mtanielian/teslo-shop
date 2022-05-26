import { useContext, useEffect, useState } from 'react'
import { getProviders, getSession, signIn } from 'next-auth/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material'
import AuthLayout from '../../components/layouts/AuthLayout'
import { isEmail } from '../../utils/validations'
import { ErrorOutline } from '@mui/icons-material'
import { loginUser } from '../../services/user.services'
import { AuthContext } from '../../contexts/AuthContext'

const LoginPage = () => {
  const [ providers, setProviders ] = useState([])
  const { setLogged } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ showError, setShowError ] = useState(false)
  const router = useRouter()

  const loadProviders = async () => {
    const provs = await getProviders()
    setProviders(Object.values(provs))
  }

  useEffect(() => {
    loadProviders()
  }, [])

  const onSubmit = async (data) => {
    const { email, password } = data
    try {
      await signIn ('credentials', { email, password })
    } catch (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } 

    // Parte del login sin NextAuth
    /*
    try {
      const {token} = await loginUser(data)
      setLogged(token)

      const destination = router.query.p || '/'
      router.replace(destination)
    } catch (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } 
    */ 
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width='500px' display='flex' justifyContent='center'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Iniciar Sesion</Typography>
              <Chip 
                color='error'
                variant='outlined'
                label='Error con el usuario ingresado'
                className='fadeIn'
                icon={ <ErrorOutline /> }
                sx={{ display: showError ? 'flex' : 'none', justifyContent: 'left' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Correo' 
                variant='filled' 
                fullWidth 
                {
                  ...register('email', {
                    required: 'El correo es obligatorio',
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
                    required: 'El password es obligatorio',
                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                  })
                }
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' fullWidth>Ingresar</Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink 
                href={ router.query.p ? `/auth/register?p=${router.query.p}` : `/auth/register` }
                passHref
              >
                <Link underline='always'>¿No tenes cuenta?</Link>
              </NextLink>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                <Divider sx={{ width: '100%', mb: 2 }} />
                { providers.map(( provider ) => {                        
                  if ( provider.id === 'credentials' ) return (<div key="credentials"></div>)
                  return (
                    <Button
                      key={ provider.id }
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ mb: 1 }}
                      onClick={ () => signIn( provider.id ) }
                    >
                      { provider.name }
                    </Button>
                  )
                })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}


export const getServerSideProps = async ({ req, query }) => {
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


export default LoginPage