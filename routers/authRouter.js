import Router from 'express'
import { loggingIn, loggingOut } from '../controllers/authApi/authController.js'


const authRouter = Router();

authRouter 
        .post('/user/login', loggingIn)

        // added logout functionality to authController
        .post('/user/logout', loggingOut) 



export default authRouter