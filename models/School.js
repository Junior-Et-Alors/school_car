import mongoose from "mongoose";
import { ObjectId } from "mongoose";

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a School name."],
    maxlenght: [60, "School name cannot be more than 20 characters"],
  },
  address: {
    street: { type: String, required: [true, "Street cannot be null"] },
    zip: { type: Number, required: [true, "Zip cannot be null"] },
    city: { type: String, required: [true, "City cannot be  null"] },
  },
  email: {
    type: String,
    required: [true, "Please provide a email."],
    maxlenght: [20, "Email cannot be more than 20 characters"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please provide a phone number."],
    min: [10, "Phone number cannot be less than 10 numbers"],
  },
  transportsId: {
    type: [{ type: ObjectId }],
  },
  image: { type: String }, // TODO : Set correctly image
  directorContact: {
    name: { type: String, required: [true, "Name of Director cannot be null"] },
    email: { type: String, required: [true, "Please provide director email"] },
    phoneNumber: {
      type: Number,
      require: [true, "Please provide director PhoneNumber"],
      min: [10, "Phone number cannot be less than 10 numbers"],
    },
  },
});

export default mongoose.models.School || mongoose.model("School", SchoolSchema);
