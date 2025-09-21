import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/mongodb.js'
import userRouter from './routers/userRouter.js'
import authRouter from './routers/authRouter.js'
import otpRouter from './routers/otpRouter.js'
import productRouter from "./routers/productRouter.js"
import passwordResetRouter from "./routers/passwordResetRouter.js"
import cartRouter from "./routers/cartRouter.js"
import cookieParser from 'cookie-parser'

dotenv.config()

connectDb()
const app = express()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api/otp', otpRouter)
app.use('/api', productRouter)
app.use('/api', passwordResetRouter)
app.use('/api', cartRouter)
app.use('/', (req, res) => {
  res.status(200).send("Welcome to E-commerce API")
})



const port = process.env.PORT 

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`)
})