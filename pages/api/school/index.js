import dbConnect from "../../../lib/dbConnect";
import School from "../../../models/School";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const schools = await School.find({});
        res.status(200).json({ success: true, data: schools });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const school = await School.create(req.body);
        res.status(201).json({ success: true, data: school });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: error.message });
      break;
  }
}
