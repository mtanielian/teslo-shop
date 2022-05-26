import mongoose, { Schema } from 'mongoose'

const OrderSchema = new Schema({
  user: { type: 'ObjectId', ref: 'User', required: true },
  orderItems: [{
    _id: { type: 'ObjectId', ref: 'Product', required: true},
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number },
    size: { type: String, required: true },
    qty: { type: Number, required: true }
  }],
  numberOfItems: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  shippingAddress: {
    name: { type: String, required: true, minlength: 3},
    lastname: { type: String, required: true, minlength: 3},
    address: { type: String, required: true, minlength: 10},
    addressOptional: { type: String },
    cp: { type: String, required: true, minlength: 2},
    city: { type: String, required: true, minlength: 2},
    countryCode: { type: String, required: true },
    phone: { type: String, required: true, minlength: 8}
  },
  isPaid : { type: Boolean, required: true, default: false },
  paidAt : { type: String },
  transactionId: { type: String }
}, {
  timestamps: true
})


const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export default OrderModel