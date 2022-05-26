import { getAddressByUserId, saveAddress  } from "../../../lib/address"


export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getAddress(req, res)
      break
    case 'POST':
      return save(req, res)
      break
    default:
      return res.status(400).json({ message: 'Method Invalid'})
  }
}
  

const save = async (req, res) => {
  const { userId } = req.query
  const { name, lastname, address, addressOptional = '', cp, city, countryCode, phone } = req.body
  
  try {
    const response = await saveAddress({ userId, name, lastname, address, addressOptional, cp, city, countryCode, phone })
    res.status(200).json({ ...response })
  } catch (error) {
    console.log('Error saveAddress: ', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}


const getAddress = async (req, res) => {
  const { userId } = req.query
  
  try {
    const response = await getAddressByUserId({ userId })
    res.status(200).json({ ...response })
  } catch (error) {
    console.log('Error getAddress: ', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}