import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import * as db from '../database/conn'
import UserModel from '../database/models/UserModel'

const serializeResponse = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}


export const loginUser = async ({ email, password }) => {
  try {
    await db.conncet()
    const user = await UserModel.findOne({ email }).lean()
    await db.disconnect()

    if (!user)
      return null

    if (!bcrypt.compareSync(password, user.password)) {
      return null
    }

    return serializeResponse(user)
  } catch (error) {
    console.log('Error loginUser: ', error)
    await db.disconnect()
    return null
  }
}


export const registerUser = async ({ username, email, password }) => {
  try {
    await db.conncet()
    const user = new UserModel({ 
      username, 
      email, 
      roles: ['user'],
      password: bcrypt.hashSync(password)
    })

    await user.save()
    await db.disconnect()

    const sUser = {
      _id: user._id,
      username,
      email,
      roles: ['user']
    }

    return serializeResponse(sUser)

  } catch (error) {
    console.log('Error registerUser: ', error)
    await db.disconnect()
    throw Error('Internal error')
  }
}

export const loginUserOauth = async ({ email, name, provider = '' }) => {
  try {
    await db.conncet()
    const user = await UserModel.findOne({ email }).lean()

    if (user) {
      await db.disconnect()
      return serializeResponse(user)
    }

    const dUser = new UserModel({
      username: name,
      email,
      password: '@',
      provider,
      roles: ['user']
    })

    await dUser.save()
    return serializeResponse(dUser)
  } catch (error) {
    console.log('Error loginUser: ', error)
    await db.disconnect()
    return null
  }

}


export const getUsers = async () => {
  try {
    await db.conncet()
    const users = await UserModel.find().select('-password').lean()
    await db.disconnect()

    return serializeResponse(users)

  } catch (error) {
    console.log('Error loginUser: ', error)
    await db.disconnect()
    return null
  }
}


export const updateRoleUser = async ({ userId, role }) => {
  if (!mongoose.isObjectIdOrHexString(userId)) {
    throw new Error('Invalid userId')
  }

  try {
    await db.conncet()
    await UserModel.findByIdAndUpdate({ _id: userId }, {
      $addToSet: { roles: role } 
    })
    await db.disconnect()

  } catch (error) {
    console.log('Error findByIdAndUpdate: ', error)
    await db.disconnect()
    return null
  }
}