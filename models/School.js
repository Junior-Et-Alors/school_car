import mongoose from 'mongoose'
import { ObjectId } from "mongoose"

/* SchoolSchema will correspond to a collection in your MongoDB database. */
const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a School name.'],
    maxlenght: [60, 'School name cannot be more than 20 characters'],
  },
  address: {
    type: String,
    required: [true, 'Please provide an address.'],
    maxlenght: [150, 'Address cannot be more than 150 characters'],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please provide a phone number.'],
    maxlenght: [20, 'Phone number cannot be more than 20 characters'],
  },
  addressId: {
    type: ObjectId,
  },
  riderId: {
    type: [{ type: ObjectId }],
  }
})

export default mongoose.models.School || mongoose.model('School', SchoolSchema)
