import mongoose from 'mongoose'
import { ObjectId } from "mongoose"

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name.'],
    maxlenght: [20, 'First name cannot be more than 20 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name.'],
    maxlenght: [20, 'Last name cannot be more than 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email.'],
    maxlenght: [20, 'Email cannot be more than 20 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please provide a phone number.'],
    maxlenght: [20, 'Phone number cannot be more than 20 characters'],
  },
  schoolId: {
    type: ObjectId,
    required: [true],
    },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
