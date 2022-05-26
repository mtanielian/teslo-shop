import mongoose, { Schema } from 'mongoose'


const AddressSchema = new Schema({
  userId: { type: 'ObjectId', ref: 'User' },
  name: { type: String, required: true, minlength: 3},
  lastname: { type: String, required: true, minlength: 3},
  address: { type: String, required: true, minlength: 10},
  addressOptional: { type: String },
  cp: { type: String, required: true, minlength: 2},
  city: { type: String, required: true, minlength: 2},
  countryCode: { type: String, required: true },
  phone: { type: String, required: true, minlength: 8}
}, {
  timestamps: true
})


const AddressModel = mongoose.models.Address || mongoose.model('Address', AddressSchema)

export default AddressModel