import Worker from "../models/Worker.js";
import validator from "validator";

export const registerWorker = async (req, res) => {
  try {
    const { name, email, password, phone, aadhaar, address, role } = req.body;

    // Required fields check
    if (!name || !email || !password || !phone || !aadhaar || !address || !role)
      return res.status(400).json({ message: "All fields are required." });

    // Email format validation
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email format." });

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone))
      return res.status(400).json({ message: "Phone must be 10 digits." });

    // Aadhaar validation
    if (!/^[0-9]{12}$/.test(aadhaar))
      return res.status(400).json({ message: "Aadhaar must be 12 digits." });

    // Check for duplicate email
    const emailExists = await Worker.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: "Email already registered." });

    // Check for duplicate Aadhaar
    const aadhaarExists = await Worker.findOne({ aadhaar });
    if (aadhaarExists)
      return res.status(400).json({ message: "Aadhaar already registered." });

    // Save worker
    const worker = new Worker({ name, email, password, phone, aadhaar, address, role });
    await worker.save();

    res.status(201).json({ message: "Worker registered successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
