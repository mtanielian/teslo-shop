import { saveOrder } from "../../../lib/order"

export default function handler( req, res ) {
  switch (req.method) {
    case 'POST':
      return createOrder( req, res )
      break
    default:
      return res.status(400).json({ message: 'Invalid Method' })
  }
  
}

const createOrder = async (req, res) => {

  // tambien se puede tomar el id del session
  /*
    const session = getSession({ req })
    session.user._id
  */

  const { userId } = req.query
  const shippingAddress = JSON.parse(req.cookies.address)
  const cartState = JSON.parse(req.cookies.cartState)
  const { cart = [], numberOfItems = 0, subTotal = 0, tax = 0, total = 0 } =  cartState

  try {
    const orderId = await saveOrder({ userId, cart, numberOfItems, subTotal, tax, total, shippingAddress })
    return res.status(201).json(orderId)
  } catch (error) {
    console.log('Error createOrder: ', error)
    return res.status(500).json({ message: 'Internal Error' })
  }
}