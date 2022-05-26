import * as db from '../../database/conn'
import ProductModel from '../../database/models/ProductModel'
import UserModel from '../../database/models/UserModel'
import { initialData } from '../../database/seed-data'

export default async function handler (req, res) {

  try {
    await db.conncet()

    
    await UserModel.deleteMany()
    await UserModel.insertMany(initialData.users)
        
    await ProductModel.deleteMany()
    await ProductModel.insertMany(initialData.products)
    
    await db.disconnect()
  
  
  } catch (error) {
    console.log('Error Load Init Products: ', error)
    await db.disconnect()
    res.status(500).json({ message: 'Error Interno del Servidor' })
  }


  res.status(200).json({ name: 'Example' })
}