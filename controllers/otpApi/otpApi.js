import OTP from "../../models/otpModel.js"
import User from "../../models/userModel.js";
import { generateOTP, sendMail } from "../../utils/sendEmail.js"


export const verifyOTP = async (req, res) => {
    const {userId} = req.params
    const {otp, email} = req.body

    try{
        //check if fields have been provided
        if (!otp) {
          return res.status(400).json({ message: "Please provide an OTP" });
        } 
        
        //check if there is an OTP for the user
        const userOtp = await OTP.findOne({ userId }).populate('userId')
        if (!userOtp) {
              return res.status(404).json({message: "otp not found for this user, please register first"});
        }

        //check if user has been verified
        if(userOtp.userId.verified) return res.status(400).json({ message: "OTP is already verified" })
        if(userOtp.otpExpires < new Date()) return res.status(400).json({ message: "OTP has expired" });
        if(userOtp.otp !== otp) return res.status(400).json({ message: "Invalid OTP" })

        //update user as verified
        await User.updateOne({ _id: userId }, { verified: true })

        //delete OTP from database since it has been verified
        await OTP.deleteMany({ userId })

      
        //send verification success email
        await sendMail({
          mailFrom: `weSELL ${process.env.EMAIL_USER}`,
          mailTo: email,
          subject: "Verification",
          body: `
            <p>Your account has successfully been verified, proceed to shop with us!</p>
            <p>Thank you!</p>
          `,
        });

    
        return res.status(200).json({ message: "OTP verified successfully" });
        
    }catch(err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//resending an OTP
export const resendOTP = async (req, res) => {
    const {userId} = req.params
    const {email} = req.body

    try{
        if (!email) {
            return res.status(400).json({ message: "Please provide an email" });
        } else{
            //delete any existing otp for the user
            await OTP.deleteMany({ userId });

            //generate a new OTP
            const { otp, otpExpires } = generateOTP()
            const otpData = new OTP({
              userId,  
                otp,
                otpExpires
            })

            await otpData.save()

            await sendMail({
              mailFrom: `weSELL ${process.env.EMAIL_USER}`,
              mailTo: email,
              subject: "Updated OTP",
              body: `
            <p>Here is your OTP ${otp}, proceed to verify</p>
          `,
            });
            res.status(200).json({ message: "OTP is resent successfully" });
        }
        

    }catch(err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error" });
    }

}

