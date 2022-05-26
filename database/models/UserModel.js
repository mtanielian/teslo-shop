import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  username : { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ 
    type: String,
    enum: {
      values: ['admin', 'user', 'root'],
      message: '{VALUE} rol incorrecto',
      default: 'user',
      required: true
    }
  }],
  provider: { type: String, required: false, default: '' }
}, {
  timestamps: true
})



const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)

export default UserModel