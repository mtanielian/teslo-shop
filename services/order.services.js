import api from './api'


export const generateOrder = async ({ userId }) => {
  const { data } = await api.post(`/order/${userId}`)
  return data
}

export const payOrder = async ({ orderId, transactionId, isPaid = false }) => {
  const { data } = await api.post('/order/pay', { orderId, transactionId, isPaid })
  return data
}