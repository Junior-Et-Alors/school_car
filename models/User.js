import mongoose from "mongoose";
import { ObjectId } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name."],
      maxlenght: [20, "First name cannot be more than 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name."],
      maxlenght: [20, "Last name cannot be more than 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email."],
      maxlenght: [20, "Email cannot be more than 20 characters"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide a phone number."],
      min: [10, "Phone number cannot be less than 10 numbers"],
    },
    address: {
      street: { type: String, required: [true, "Street cannot be null"] },
      zip: { type: Number, required: [true, "Zip cannot be null"] },
      city: { type: String, required: [true, "City cannot be  null"] },
    },
    school: {
      type: [String],
      required: [true, "Must enter at least 1 school"],
      validate: (value) => Array.isArray(value) && value.length > 0,
    },
    travelDone: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
