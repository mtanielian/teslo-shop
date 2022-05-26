import AdminLayout from '../../components/layouts/AdminLayout'
import ListItem from '../../components/admin/ListItem'
import { Grid } from '@mui/material'

import { 
  AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, 
  CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined 
} from '@mui/icons-material'
import { useFetchData } from '../../hooks/useSWR'
import { useEffect, useState } from 'react'


const DashboardPage = () => {
  const [ refreshIn, setRefreshIn ] = useState(30)
  const { data = {}, loading, error } = useFetchData({ url: '/admin/dashboard', config: {
    refreshInterval: 30 * 1000 // 30 seconds
  }})

  useEffect(() => {
    const interval = setInterval(()=>{
      console.log('Tick');
      setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
    }, 1000 );
  
    return () => clearInterval(interval)
  }, []);


  if (loading) {
    return <>Cargando.....</>
  }
    
  if (error) {
    return <>Ocurrio un error con la carga de los datos</>
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders,
  } = data

  return (
    <AdminLayout
      title='Dashboard' 
      subTitle='Estadisticas generales'
        icon={ <DashboardOutlined /> }
    >
      <Grid container spacing={2}>
        <ListItem
            title={ numberOfOrders }
            subTitle="Ordenes totales"
            icon={ <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} /> }
        />

        <ListItem 
            title={ paidOrders }
            subTitle="Ordenes pagadas"
            icon={ <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} /> }
        />

        <ListItem
            title={ notPaidOrders }
            subTitle="Ordenes pendientes"
            icon={ <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} /> }
        />

        <ListItem
            title={ numberOfClients }
            subTitle="Clientes"
            icon={ <GroupOutlined color="primary" sx={{ fontSize: 40 }} /> }
        />

        <ListItem
            title={ numberOfProducts }
            subTitle="Productos"
            icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> }
        />

        <ListItem
            title={ productsWithNoInventory }
            subTitle="Sin existencias"
            icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> }
        />

        <ListItem
            title={ lowInventory }
            subTitle="Bajo inventario"
            icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> }
        />

        <ListItem
            title={ refreshIn }
            subTitle="Actualización en"
            icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> }
        />
      </Grid>
    </AdminLayout>
  )
}


export default DashboardPage