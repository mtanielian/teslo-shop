import { getAllProducts, getProductById, updateProductById, createProduct } from "../../../lib/product"

export default function handler (req, res) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)
    case 'POST':
      return createNewProduct(req, res)
    case 'PUT':
      return updateProduct(req, res)
    default:      
      res.status(400).json({ name: 'Invalid Method' })
  }
}



export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts()
    res.status(200).json({ products })
  } catch (error) {
    console.log('Error getAllProducts: ', error)
    res.status(500).json({ message: 'Internal Error '})
  }
}

export const createNewProduct = async (req, res) => {
  try {
    const { images } = req.body
    if (images.length < 2) {
      res.status(400).json({ message: '2 Minimun number of images per product' })
    }

    const product = await createProduct({ data: req.body })
    res.status(200).json({ product })

  } catch (error) {
    console.log('Error updateProducts: ', error)
    res.status(500).json({ message: 'Internal Error '})
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { _id,  images } = req.body
    if (images.length < 2) {
      res.status(400).json({ message: '2 Minimun number of images per product' })
    }

    const productDb = await getProductById({ _id })
    if (!productDb) {
      res.status(400).json({ message: 'Product dont exists'})
    }

    const product = await updateProductById({ _id, data: req.body })
    res.status(200).json({ product })

  } catch (error) {
    console.log('Error updateProducts: ', error)
    res.status(500).json({ message: 'Internal Error '})   
  }
}