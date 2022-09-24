import dbConnect from "../../../lib/dbConnect";
import Ride from "../../../models/Ride";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const rides = await Ride.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: rides });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const ride = await Ride.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: ride });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
