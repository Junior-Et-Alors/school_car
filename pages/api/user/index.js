import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
        try {
            const users = await User.find({}); /* find all the data in our database */
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
        case "POST":
        try {
            req.body.password = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS));
            const user = await User.create(req.body);
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
        break;
        default:
        res.status(400).json({ success: false });
        break;
    }
}