import * as db from '../../../database/conn'
import OrderModel from '../../../database/models/OrderModel'
import ProductModel from '../../../database/models/ProductModel'
import UserModel from '../../../database/models/UserModel'


export default async function handler (req, res) {
  try {
    await db.conncet()
    const [
      numberOfOrders,
      paidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory,
    ] = await Promise.all([  
      OrderModel.count(),
      OrderModel.find({ isPaid: true }).count(),
      UserModel.find({ roles: 'user' }).count(),
      ProductModel.count(),
      ProductModel.find({ inStock: 0 }).count(),
      ProductModel.find({ inStock: { $lte: 10 } }).count(),
    ])
    await db.disconnect()

    res.status(200).json({ 
      numberOfOrders,
      paidOrders,
      notPaidOrders: numberOfOrders - paidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory
    })

  } catch (error) {
    await db.disconnect()
    console.log('Error', error)
    res.status(500).json({ message: 'Internal Error'})
  }

}