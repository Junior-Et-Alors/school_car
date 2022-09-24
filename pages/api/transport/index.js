import dbConnect from "../../../lib/dbConnect";
import Transport from "../../../models/Transport";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const transports = await Transport.find(
          {}
        ); /* find all the data in our database */
        console.log(transports);
        res.status(200).json({ success: true, data: transports });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const transport = await Transport.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: transport });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: error.message });
      break;
  }
}
