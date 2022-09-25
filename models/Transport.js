import mongoose, { ObjectId } from "mongoose";

const Transport = new mongoose.Schema(
  {
    driverId: {
      type: ObjectId,
      required: [true, "One ride must be affect to One User"],
      default: function () {
        return this.user_id;
      },
    },
    usersId: [{ type: ObjectId }],
    places: {
      type: Number,
      required: [true, "Please tell number place available"],
      min: [0, "Minimum place available is 0"],
      max: [4, "Maximum places available is 4"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transport ||
  mongoose.model("Transport", Transport);
