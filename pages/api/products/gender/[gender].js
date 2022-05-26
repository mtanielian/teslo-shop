import { getProductsByGender } from "../../../../lib/product"

export default function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return getByGender(req, res)
      break
    default:
      res.status(400).json({ message: 'Method invalid' })
  }
}


const getByGender = async (req, res) => {
  const { gender } = req.query
  try {
    const products = await getProductsByGender({ gender })
    res.status(200).json({ products })
  } catch (error) {
    console.log('Error getByGender: ', error)
    res.status(500).json({ message: 'Error del servidor' })
  }

}