import Volunteer from "../models/Volunteer.js";
import validator from "validator";

export const registerVolunteer = async (req, res) => {
  try {
    const { name, email, contact, city, state, reason } = req.body;

    if (!name || !email || !contact || !city || !state)
      return res.status(400).json({ message: "All fields except reason are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email address" });

    if (!/^[0-9]{10}$/.test(contact))
      return res.status(400).json({ message: "Contact must be 10 digits" });

    const exists = await Volunteer.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    await Volunteer.create({ name, email, contact, city, state, reason });

    res.status(201).json({ message: "✅ Volunteer Registered Successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
