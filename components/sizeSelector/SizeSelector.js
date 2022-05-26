import { Box, Button } from "@mui/material"

const SizeSelector = ({ sizes, onSizeSelectorPress, sizeSelected }) => {
  return (
    <Box marginTop={1} display='flex'>
      {sizes.map((size, index) => 
        <Button 
          onClick={() => onSizeSelectorPress(size) } key={index} sx={{ marginRight: 2 }} 
          variant="outlined" 
          color={ sizeSelected === size ? 'secondary' : 'primary' }
        >{size}</Button>
      )}
    </Box>
  )
}

export default SizeSelector