import { getProductsBySearch } from "../../../../lib/product"

export default function handler (req, res) {
  switch( req.method ) {
    case 'GET':
      return getProducts(req, res)
      break
    default:
      res.status(400).json({ message: 'Invalid Method' })
  }
}


const getProducts = async (req, res) => {
  const { search } = req.query
  try {
    const products = await getProductsBySearch({ searchText: search })
    res.status(200).json({ products })
  } catch (error) {
    console.log('Error getProducts: ', error)
    res.status(400).json(error)
  }
}