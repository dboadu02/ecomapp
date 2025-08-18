import Router from 'express'
import {passwordResetRequest, passwordReset} from '../controllers/passwordResetApi.js/passwordReset.js'

const passwordResetRouter = Router()

passwordResetRouter
  .post("/password/resetRequest", passwordResetRequest)
  .post("/password/reset", passwordReset)



export default passwordResetRouter