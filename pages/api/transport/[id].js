import dbConnect from "../../../lib/dbConnect";
import Transport from "../../../models/Transport";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      // request for get all infos about one transport : transport,driver,travelers
      const id = req.query.id;

      try {
        const transport = await Transport.findById(id);

        if (!transport)
          return res
            .status(400)
            .json({ success: false, error: "Not match for this Id!" });

        const driver = await User.findById(transport.driverId);
        const travelers = await User.find({
          _id: { $in: transport.usersId },
        });

        const data = {
          transport,
          driver,
          travelers,
        };

        res.status(200).json({ success: true, data });
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

        if (updateTransport == null)
          return res
            .status(400)
            .json({ succes: false, error: "This transport doesn't exist" });

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
