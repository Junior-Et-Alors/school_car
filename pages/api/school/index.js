import dbConnect from "../../../lib/dbConnect";
import School from "../../../models/School";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
        try {
            const schools = await School.find({}); /* find all the data in our database */
            res.status(200).json({ success: true, data: schools });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
        case "POST":
        try {
            const pet = await School.create(
            req.body
            ); /* create a new model in the database */
            res.status(201).json({ success: true, data: pet });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
        default:
        res.status(400).json({ success: false });
        break;
    }
}