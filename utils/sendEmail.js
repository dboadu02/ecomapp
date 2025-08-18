import nodemailer from 'nodemailer'
import crypto from 'crypto'

//this is a utility function to send emails
export const sendMail = async ({ mailFrom, mailTo, subject, body }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //send mail
    const info = await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      html: body,
    });
    return info;
  } catch (err) {
    console.log(err.message);
  }
}


//this function generates a random OTP and sets its expiration time
export const generateOTP = () => {
  return {
    otp: Math.floor(100000 + Math.random() * 900000).toString(),
    otpExpires: new Date(Date.now() + 5 * 60 * 1000)//OTP expires in 5 minutes
  };
};

//uses crypto to generate a token
export const passwordResetToken = () => {
  return {
    resetToken: crypto.randomBytes(32).toString("hex"),
    expiresAt: new Date(Date.now() + 3 * 60 * 1000),
  };
};