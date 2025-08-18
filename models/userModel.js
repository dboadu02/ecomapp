import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    ultimateAdmin: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    passwordResetToken: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export default User