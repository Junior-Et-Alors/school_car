import dbConnect from "../../../lib/dbConnect";
import Transport from "../../../models/Transport";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const id = req.query.id;
        const transport = await Transport.findById(id);
        res.status(200).json({ success: true, data: transport });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PUT":
      try {
        const id = req.query.id;
        const updateTransport = await Transport.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200).json({ success: true, data: updateTransport });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const id = req.query.id;
        await Transport.deleteOne({ _id: id });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
}
