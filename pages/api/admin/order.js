import { getOrders } from "../../../lib/order"

export default function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return getAllOrders(req, res)
      break
    default:
      return res.status(400).json({ message: 'Method Invalid' })
  }
}


const getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders()
    res.status(200).json({ orders })
  } catch (error) {
    console.log('Error getOrders: ', error)
    res.status(500).json({ message: 'Internal error' })
  }
}