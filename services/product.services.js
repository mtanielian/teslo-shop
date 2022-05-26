import api from './api'

export const getAllProducts = async () => {
  const { data } = await api.get('/products')
  return data
}


export const getProductsByGender = async ({ gender }) => {
  const { data } = await api.get(`/products/gender/${gender}`)
  return data
}

export const updateProductById = async (product) => {
  const { data } = await api.put('/admin/product', product)
  return data
}

export const createProduct = async (product) => {
  const { data } = await api.post('/admin/product', product)
  return data
}