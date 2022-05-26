import mongoose from 'mongoose'
import * as db from '../database/conn'
import OrderModel from '../database/models/OrderModel'
import { serializeResponse } from '../utils/arrays'



export const saveOrder = async ({ userId, cart, numberOfItems, subTotal, tax, total, shippingAddress }) => {
  if (!mongoose.isObjectIdOrHexString(userId))
    throw Error('UserId invalid')

  try {
    await db.conncet()
    const order = new OrderModel({
      user: userId, 
      orderItems: cart, 
      numberOfItems, 
      subTotal, 
      tax, 
      total, 
      shippingAddress
    })
    await order.save()
    await db.disconnect()

    return serializeResponse({ orderId: order._id })

  } catch (error) {
    await db.disconnect()
    console.log('Error createOrder: ', error)
    throw Error('Internal Error')
  }
}


export const getOrderById = async ({ userId = '', orderId, checkUserOrderIds = true }) => {
  if (!mongoose.isObjectIdOrHexString(orderId))
    throw Error('orderId invalid')
  
  try {

    await db.conncet()
    const order = await OrderModel.findById( orderId ).lean()
    await db.disconnect()

    if (checkUserOrderIds && order.user != userId)
      throw Error('order dont match with user')

    return serializeResponse(order)

  } catch (error) {
    await db.disconnect()
    console.log('Error getOrderById: ', error)
    throw Error('Internal Error')
  }
}


export const getOrdersByUserId  = async ({ userId }) => {
  if (!mongoose.isObjectIdOrHexString(userId))
    throw Error('userId invalid')
  
  try {
    await db.conncet()
    const orders = await OrderModel.find({ user: userId }).lean()
    await db.disconnect()

    return serializeResponse(orders)
  } catch (error) {
    await db.disconnect()
    console.log('Error getOrdersByUserId: ', error)
    throw Error('Internal Error')
  }
}


export const updateOrderPay = async ({ orderId, isPaid, transactionId }) => {
  if (!mongoose.isObjectIdOrHexString(orderId))
    throw Error('orderId invalid')

  try {

    await db.conncet()
    const order = await OrderModel.findByIdAndUpdate(orderId, { isPaid, transactionId })
    await db.disconnect()

    return serializeResponse(order)
  } catch (error) {
    await db.disconnect()
    console.log('Error updateOrderPay: ', error)
    throw Error('Internal Error')
  }
}


export const getOrders = async () => {
  try {
    await db.conncet()
    const orders = await OrderModel
      .find()
      .sort('createdAt')
      .populate('user', 'username email')
      .lean()

    await db.disconnect()
    return serializeResponse(orders)

  } catch (error) {
    await db.disconnect()
    console.log('Error getOrder: ', error)
    throw Error('Internal Error')
  }

}