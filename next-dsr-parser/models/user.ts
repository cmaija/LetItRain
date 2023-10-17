import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: String,
  email: String,
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
