import mongoose from 'mongoose'
import { ObjectId } from "mongoose"

/* PetSchema will correspond to a collection in your MongoDB database. */
const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  riderId: {
    type: [{ type: ObjectId }],
    },
})

export default mongoose.models.School || mongoose.model('School', SchoolSchema)
