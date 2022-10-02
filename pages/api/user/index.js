import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import School from "../../../models/School";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      const {
        lastName,
        firstName,
        password,
        email,
        phoneNumber,
        address,
        school,
      } = req.body;

      const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

      const userSchoolToAdd = await School.findOne({
        "address.city": address.city.toLowerCase(),
        name: school,
      });

      const newUser = {
        lastName: lastName.toLowerCase(),
        firstName: firstName.toLowerCase(),
        password: hash,
        email: email.trim(),
        phoneNumber: Number(phoneNumber),
        school: userSchoolToAdd._id.toString(),
        address: {
          street: address.street.toLowerCase(),
          zip: Number(userSchoolToAdd.address.zip),
          city: address.city.toLowerCase(),
        },
      };

      try {
        const user = await User.create(newUser);
        res.status(201).json({
          success: true,
          data: user,
          message: "Utilisateur enregistré:",
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error.message });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
