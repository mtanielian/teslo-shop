import mongoose from 'mongoose'

export const conncet = async () => {
  await mongoose.connect(process.env.MONGO_URL)
}


export const disconnect = async () => {
  await mongoose.disconnect()
}