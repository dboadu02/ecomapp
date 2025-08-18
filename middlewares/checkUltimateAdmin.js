import User from '../models/userModel.js'


const checkUltimateAdmin = async (req, res, next) => {
    const userId = req.user.id

    try{
        const user = await User.findById(userId)

        if(!user) return res.status(404).json({ message: 'User not found' })
        
        if(!user.ultimateAdmin) {
            return res.status(403).json({ message: 'Access denied, you are not an ultimate admin' })
        }

        next()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export default checkUltimateAdmin;