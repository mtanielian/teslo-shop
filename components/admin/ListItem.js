import { Grid, Card, CardContent, Typography } from "@mui/material"

const ListItem = ({ title, subTitle, icon }) => {
  return (
    <Grid item xs={12} md={3} sm={3}>
      <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ width: 50, display:'flex', justifyContent: 'center', alignItems: 'center' }}>
            { icon }
        </CardContent>
        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h3'>{ title }</Typography>
            <Typography variant='caption'>{ subTitle }</Typography>
        </CardContent>
      </Card>
    </Grid> 
  )
}


export default ListItem