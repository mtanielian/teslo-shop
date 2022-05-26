import NavBarAdmin from "../navBarAdmin"
import SideMenu from "../sideMenu/SideMenu"
import { Box, Typography } from '@mui/material';

const MainLayout = ({ children, title = 'Teslo Shop', subTitle = '', icon = '' }) => {
  return (
    <>     
      <nav>
        <SideMenu />
      </nav>
      <NavBarAdmin />
      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      
      }}>
        <Box display="flex" flexDirection='column'>
          <Typography variant='h1' component='h1'>
              { icon }
              {' '} { title }
          </Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>{ subTitle }</Typography>
        </Box>
        <Box className='fadeIn'>
          {children}
        </Box>
      </main>
    </>
  )
}

export default MainLayout