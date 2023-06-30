

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: String,
    password: { type: String, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    avatar: { type: String, required: true }
    // image: { type: String, default: "https://res.cloudinary.com/dtdsw5fg2/image/upload/v1683544833/user_avatars/kitten-playing_xiwu5g.gif" }
}, { timestamps: true })


const UserModel = mongoose.model("author", userSchema);
export default UserModel




// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     username: String,
//     password: { type: String, required: true },
//     pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }],
//     avatar: { type: String }
//     // avatar: { type: String, default: "https://res.cloudinary.com/dtdsw5fg2/image/upload/v1683544833/user_avatars/kitten-playing_xiwu5g.gif" }
// }, { timestamps: true })


// const UserModel = mongoose.model("user", userSchema);
// export default UserModel