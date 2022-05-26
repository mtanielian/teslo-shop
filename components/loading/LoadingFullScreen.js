import { Box, CircularProgress, Typography } from "@mui/material"

const LoadingFullScreen = ({ title = 'Cargando...', showIcon = true }) => {
  return (
    <Box
        display='flex'
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        height='calc(100vh - 200px)'
    >
      <Typography>{title}</Typography>
      {showIcon && 
        <CircularProgress thickness={5} sx={{mt: 3}} />
      }
    </Box>
  )
}

export default LoadingFullScreen