import User from '../../models/userModel.js'
import bcrypt from 'bcrypt'

export const updateUser = async (req, res) => {
    const {id} = req.params
    const {username, password} = req.body
    const reqId = req.user.id

    if (reqId !== id) return res.status(403).json({ message: "You are not authorized to update this user" });

    const updateData = {};
    if (username) updateData.username = username;
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
    }


    try {
      const user = await User.findByIdAndUpdate(id, updateData, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.json({ message: "User updated successfully!", user });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: "Server error!" });
    }
  }
