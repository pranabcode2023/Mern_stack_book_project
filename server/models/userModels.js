// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const userSchema = new Schema({
//     email: String, // String is shorthand for {type: String}
//     userName: String,
//     password: String,
//     // picture: String,

//     // admin: Boolean,

// });
// const userModel = mongoose.model('user', userSchema);
// export default userModel


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: String,
    password: { type: String, required: true },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }]
}, { timestamps: true })


const UserModel = mongoose.model("user", userSchema);
export default UserModel