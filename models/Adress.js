import mongoose from 'mongoose'
import { ObjectId } from "mongoose"

/* AddressSchema will correspond to a collection in your MongoDB database. */
const AddressSchema = new mongoose.Schema({
    numberStreet: {
        type: Number,
        required: [true, 'Please provide a street number.'],
        maxlenght: [5, 'Street number cannot be more than 5 characters'],
    },
    street: {
        type: String,
        required: [true, 'Please provide a street address.'],
        maxlenght: [150, 'Street address cannot be more than 150 characters'],
    },
    zipCode: {
        type: Number,
        required: [true, 'Please provide a zip code.'],
        maxlenght: [10, 'Zip code cannot be more than 10 characters'],
    },
    town: {
        type: String,
        required: [true, 'Please provide a street.'],
        maxlenght: [150, 'Street cannot be more than 150 characters'],
    },
})

export default mongoose.models.Adress || mongoose.model('Adress', AddressSchema)
