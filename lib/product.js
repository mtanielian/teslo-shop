import mongoose from 'mongoose'
import * as db from '../database/conn'
import ProductModel from '../database/models/ProductModel'

const serializeResponse = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const getAllProducts = async () => {
  try {
    await db.conncet()
    const products = await ProductModel.find().sort({ createdAt: 'descending' }).lean()
    await db.disconnect()

    return serializeResponse(products)
  } catch (error) {
    await db.disconnect()
    console.log('Error getAllProducts: ', error)
  }
}

export const getProductsByGender = async ({ gender }) => {
  try {
    await db.conncet()
    const products = await ProductModel.find({ gender }).sort({ createdAt: 'descending' }).lean()
    await db.disconnect()

    return serializeResponse(products)
  } catch (error) {
    await db.disconnect()
    console.log('Error getAllProducts: ', error)
  }
}

export const getProductBySlug = async ({ slug }) => {
  try {
    await db.conncet()
    const product = await ProductModel.findOne({ slug }).lean()
    await db.disconnect()

    return serializeResponse(product)
  } catch (error) {
    await db.disconnect()
    console.log('Error getProductBySlug: ', error)
  }
}

export const getProductsBySearch = async ({ searchText = '' })  => {
  try {
    await db.conncet()
    const products = await ProductModel.find({
      $text: { $search: searchText }
    }).lean()
    await db.disconnect()

    return serializeResponse(products)
  } catch (error) {
    await db.disconnect()
    console.log('Error getProductsBySearch: ', error)
  }
}


export const getAllSlugProducts = async () => {
  try {
    await db.conncet()
    const products = await ProductModel.find().select('slug -_id').lean()
    await db.disconnect()

    return serializeResponse(products)
  } catch (error) {
    await db.disconnect()
    console.log('Error getAllSlugProducts: ', error)
  }
}


export const getProductById = async ({ _id }) => {
  if ( !mongoose.isObjectIdOrHexString(_id) ) {
    throw new Error('product Id invalid')
  }

  try {
    await db.conncet()
    const product = await ProductModel.findById(_id).lean()
    await db.disconnect()

    return serializeResponse(product)
  } catch (error) {
    await db.disconnect()
    console.log('Error getProductById: ', error)
    return null
  }
}

export const updateProductById = async ({ _id, data }) => {
  try {
    await db.conncet()
    const product = await ProductModel.findByIdAndUpdate(_id, data)
    await db.disconnect()

    return serializeResponse(product)
  } catch (error) {
    await db.disconnect()
    console.log('Error updateProductById: ', error)
    throw new Error('Internal Error')
  }
}


export const createProduct = async ({ data }) => {
  try {
    await db.conncet()
    const product = new ProductModel(data)
    await product.save()
    await db.disconnect()

    return serializeResponse(product)
  } catch (error) {
    await db.disconnect()
    console.log('Error createProduct: ', error)
    throw new Error('Internal Error')
  }
}