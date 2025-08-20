import User from '../../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const loggingIn = async (req, res) => {
    const { email, password } = req.body


    if(!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    try{
    //check if user exists
        const user = await User.findOne({ email})
        if(!user){
            return res.status(404).json({ message: 'Please create an account' })
        }

        //comparing hashed password with the provided password
        const compared = await bcrypt.compare(password, user.password)
        if(!compared){
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        // Generate a token for the user
        const genToken = (id) => {
            return jwt.sign({ id }, process.env.JWT_SECRET, 
            {expiresIn: "5m",})
        }

        
        const token = genToken(user._id);

            return res
            .cookie("accessToken", token, {
                httpOnly: true,
                sameSite: "strict", // Helps prevent CSRF attacks
            })
        .status(200)
        .json({ message: "Login successful" });

      

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
}


//logging out user
export const loggingOut = async (req, res) => {
    const {id} = req.params
    
    // This will remove the accessToken from the user's browser
    try {
        const user = await User.findById(id)
        if(!user){
            res.status(400).json({message: 'user not found'})
        }

        res.clearCookie("accessToken")
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


