import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    const jwtSecret = process.env.JWT_SECRET

    if(!accessToken) return res.status(401).json({ message: 'Please log in first' })

    try{
        //decode the token in the request cookie and verify it
        const verifiedToken = jwt.verify(accessToken, jwtSecret)
        if(!verifiedToken) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        //check if user exists in database
        const verifiedUser = await User.findById(verifiedToken.id)
        if(!verifiedUser) {
            return res.status(404).json({ message: 'Invalid user' })
        }
        req.user = verifiedUser
        next()
        
    }
    catch (error) {
        res
          .status(500)
          .json({ message: "jwt token expired, please login again" });
    }
}


export default authMiddleware