import api from './api'

export const saveAddress = async ({ userId, name, lastname, address, addressOptional, cp, city, countryCode, phone }) => {
  const { data } = await api.post(
    `/address/${userId}`, 
    { name, lastname, address, addressOptional, cp, city, countryCode, phone }
  )

  return data
}


export const getAddressByUserId = async ({ userId }) => {
  const { data } = await api.get(`/address/${userId}`)
  return data
}