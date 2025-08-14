import Router from 'express'
import {verifyOTP, resendOTP} from '../controllers/otpApi/otpApi.js'

const otpRouter = Router()

otpRouter
        .post('/verify/:userId', verifyOTP)
        .post('/resend/:userId', resendOTP)



export default otpRouter