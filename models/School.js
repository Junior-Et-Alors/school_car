import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  Address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
})

export default mongoose.models.School || mongoose.model('School', SchoolSchema)
