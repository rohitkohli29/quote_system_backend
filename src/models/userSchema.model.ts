import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        default: null
    },
    city: {
        type: String,
        required: true,
    },
    zip_code: {
        type: String,
        required: true,
    },
    primary_phone: {
        type: String,
        required: true,
    },
    alternate_phone: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;