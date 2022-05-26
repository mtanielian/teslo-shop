import { getSession } from 'next-auth/react'
import axios from 'axios'
import { getOrderById, updateOrderPay } from '../../../lib/order'

export default function handler (req, res) {
  switch (req.method) {
    case 'POST':
      return checkPay(req, res)
      break
    default:
      return res.status(400).json({ name: 'Bad Request' })
  }
}



const getPaypalBearerToken = async() => {
    
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET

  const base64Token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64')
  const body = new URLSearchParams('grant_type=client_credentials')

  try {
    const { data} = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
      headers: {
        'Authorization': `Basic ${ base64Token }`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return data.access_token


  } catch (error) {
      if ( axios.isAxiosError(error) ) {
          console.log(error.response?.data)
      } else {
          console.log(error)
      }

      return null
  }


}


const checkPay = async (req, res) => {
  const paypalBearerToken = await getPaypalBearerToken()
 
  if (!paypalBearerToken) {
    res.status(401).json({ message: 'Token not confirm'})
  }

  const { transactionId = '', orderId = ''  } = req.body;
 
  try {
    /* FAIL TODO: CHANGE
    const { data } = await axios.post( `${ process.env.PAYPAL_ORDERS_URL }/${ transactionId }`, {
      headers: {
        'Authorization': `Bearer ${ paypalBearerToken }`
      }
    })

    if (data.status !== 'COMPLETED') {
      return res.status(400).json({ message: 'Unknown order' });
    }
    */ 

    const session = await getSession({ req })
    if (!session) {
      return res.status(401).json({ message: 'User not found' });
    }

    const order = await getOrderById({  userId: session.user._id, orderId })
    if (!order) {
      return res.status(400).json({ message: 'Order not found in database' })
    }

    /*
    if ( order.total !== Number(data.purchase_units[0].amount.value) ) {
      return res.status(400).json({ message: 'Los montos de PayPal y nuestra orden no son iguales' });
    }
    */

    const orderUpdated = await updateOrderPay({ orderId, isPaid: true, transactionId})


    res.status(200).json({ message: 'Order pay', order: orderUpdated })

  } catch (error) {
    console.log('Error CheckPay: ', error)
    return res.status(500).json({ message: 'Internal Error'})
  }
}