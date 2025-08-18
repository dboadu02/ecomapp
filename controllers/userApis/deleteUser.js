import User from '../../models/userModel.js'


export const deleteUser = async (req, res) => {
    const { id } = req.params
    const reqId = req.user.id
    const { isAdmin } = req.user

    // Check if the user is trying to delete their own account or if they are an admin
    if (reqId === id || isAdmin) {
         try {
           const user = await User.findByIdAndDelete(id);
           if (!user) {
             return res.status(404).json({ message: "User not found" });
           }
           res.status(200).json({ message: "User deleted successfully" });
         } catch (error) {
           console.log(error.message);
           res.status(500).json({ message: "Server error" });
         }
    } else {
        return res.status(403).json({ message: "You are not authorized to delete this user" });
    }
}