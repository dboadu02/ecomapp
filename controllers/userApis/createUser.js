import User from "../../models/userModel.js";
import OTP from "../../models/otpModel.js";
import bcrypt from "bcrypt";
import { generateOTP, sendMail } from "../../utils/sendEmail.js";


export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //check if this email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password for security using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    if (email == process.env.ULTIMATE_ADMIN_EMAIL) {
      //for ultimate admin
      const ultAdmin = new User({
        ...req.body,
        password: hashedPassword,
        ultimateAdmin: true,
        isAdmin: true,
        verified: true
      });

      await ultAdmin.save();
      return res
        .status(201)
        .json({
          message: "Ultimate Admin registered successfully",
          user: ultAdmin,
        });
    }

    // Generation OTP and its expiration time for registration for normal users
    const { otp, otpExpires } = generateOTP();

    //creation of a normal user
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      isAdmin: false,
      ultimateAdmin: false
    });

    await newUser.save();

    // Create OTP document
    // This will link the OTP to the user
    const otpData = new OTP({
      userId: newUser._id,
      otp,
      otpExpires
    })
    await otpData.save();
    

    //sendinng emails to new users with otp
    try {
      const mailObj = {
        mailFrom: `weSELL ${process.env.EMAIL_USER}`,
        mailTo: email,
        subject: "Successfully created an account✨",
        body: `
                <h1>Welcome to weSELL, <strong>${username}</strong> </h1>
                <p>Here is your OTP <b>${otp}</b>, proceed to verify your mail</p>
                <p>This code <b>expires in 3 minutes</p>
                
          `,
      };
      await sendMail(mailObj);
      
    } catch (err) {
      console.log(err.message);
    }

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



//make a user an admin
export const makeAdmin = async (req, res) => {
  const {id} = req.params;
  const {ultimateAdmin} = req.user;

  if(req.user.id && ultimateAdmin){
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user is already an admin
      if (user.isAdmin) {
        return res.status(400).json({ message: "User is already an admin" });
      }

      // Update the user's isAdmin field
      user.isAdmin = true;
      await user.save();

      return res.status(200).json({ message: "User made an admin successfully", user });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }else{
    return res.status(403).json({ message: "You are not authorized to perform this action" });
  }
}