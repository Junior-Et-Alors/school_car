import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
        try {
            const id = req.query.id; 
            console.log(id);
            const user = await User.findById(id); /* find all the data in our database */
            console.log(user);
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
    }
}