import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
   /*  verified: {
      type: Boolean,
      default: false,
    }, */
  },
  { timestamps: true }
);

const OTP = mongoose.model('OTP', otpSchema);
export default OTP;