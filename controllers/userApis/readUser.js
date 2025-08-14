import User from '../../models/userModel.js'


export const getUser = async (req, res) => {
    const {id} = req.params
    const reqId = req.user.id

    if(reqId === id){
      try {
        const user = await User.findById(id).select("-password");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
    } else {
      return res.status(403).json({ message: "You are not authorized to view this user" })
    
    }

}


export const getAllUsers = async (req, res) => {
    const {isAdmin} = req.user

    // Check if the user is an admin and the id matches
    if(req.user.id === id && isAdmin) {
      try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
      } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Server error" });
      }
    } else {
      return res.status(403).json({ message: "You are not authorized to view all users" })
    }

}
   