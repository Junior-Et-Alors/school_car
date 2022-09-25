import dbConnect from "../../../lib/dbConnect";
import School from "../../../models/School";
import Transport from "../../../models/Transport";

export default async function handler(req, res) {
    const { method } = req;
    const city = req.body.city;
    const name = req.body.schoolName;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const school = await School.find({
                    $and: [
                        { 'address.city': city },
                        { name: name }
                    ]
                });
                let rides = await Promise.all(school[0].transportsId.map(async (transportsId) => {
                    return await Transport.findById(transportsId);
                }));
                res.status(200).json({ success: true, data: rides });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}