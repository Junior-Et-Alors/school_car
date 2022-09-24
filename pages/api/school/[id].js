import dbConnect from "../../../lib/dbConnect";
import School from "../../../models/School";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
        try {
            const id = req.query.id;
            const school = await School.findById(id); /* find all the data in our database */
            res.status(200).json({ success: true, data: school });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;        
    }
}