import * as db from '../../../database/conn'
import ProductModel from '../../../database/models/ProductModel'

export default function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return getAllProducts(res)
    default:
      return res.status(404)
  }
}



const getAllProducts = async (res) => {
  try {
    await db.conncet()
    const products = await ProductModel.find()
    await db.disconnect()
 
    res.status(200).json({ products }).sort({ gender: 'ascending' })
 
  } catch (error) {
    await db.disconnect()
    res.status(500)
  }
}