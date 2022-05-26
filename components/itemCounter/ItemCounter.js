import { Box, IconButton, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'


const ItemCounter = ({ onCounterPress, quantitySelected, stock }) => {
  const onPress = (qty) => {
    if (qty === 0 || qty > stock) return

    onCounterPress(qty)
  }
  
  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={() => onPress(quantitySelected - 1) }>
        <RemoveCircleOutlineOutlinedIcon />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }} variant='subtitle2'> { quantitySelected } </Typography>
      <IconButton onClick={() => onPress(quantitySelected + 1) }>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </Box>
  )
}

export default ItemCounter

