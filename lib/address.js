import mongoose from 'mongoose'
import * as db from '../database/conn'
import AddressModel from '../database/models/AddressModel'
import { serializeResponse } from '../utils/arrays'

export const saveAddress = async ({ userId, name, lastname, address, addressOptional = '', cp, city, countryCode, phone }) => {
  try {
    if (!mongoose.isObjectIdOrHexString(userId))
      throw Error('Invalid userId')
    
    await db.conncet()
    const row = await AddressModel.findOneAndUpdate( 
      { userId } , 
      { userId, name, lastname, address, addressOptional, cp, city, countryCode, phone }, 
      { new: true, upsert: true } 
    )
    await db.disconnect()

    return serializeResponse(row)
  } catch (error) {
    await db.disconnect()
    console.log('Error saveAddress: ', error)
    throw Error('Internal Error')
  }
}


export const getAddressByUserId = async ({ userId }) => {
  try {
    if (!mongoose.isObjectIdOrHexString(userId))
      throw Error('Invalid userId')
    
    await db.conncet()
    const row = await AddressModel.findOne({ userId }).lean()
    await db.disconnect()

    return serializeResponse(row)
  } catch (error) {
    await db.disconnect()
    console.log('Error getAddressByUserId: ', error)
    throw Error('Internal Error')
  }
}