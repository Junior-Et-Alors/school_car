import mongoose, { ObjectId } from "mongoose";

const RideSchema = new mongoose.Schema(
  {
    ownerId: {
      type: ObjectId,
      required: true,
      default: function () {
        return this.user_id;
      },
    },
    usersId: [{ type: ObjectId }],
  },
  { timestamps: true }
);

export default mongoose.models.Ride || mongoose.model("Ride", RideSchema);
