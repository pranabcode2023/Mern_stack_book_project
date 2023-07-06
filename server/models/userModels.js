import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }], // ref reffer to the relevant collection in mongo db
    avatar: { type: String, default: "https://res.cloudinary.com/danq3q4qv/image/upload/v1683035195/avatars/default-profile-picture-avatar-photo-placeholder-vector-illustration-700-205664584_z4jvlo.jpg" },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true })

const UserModel = mongoose.model("user", userSchema)

export default UserModel







// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     username: String,
//     password: { type: String, required: true },
//     books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],  // ref reffer to the relevant collection in mongo db
//     avatar: { type: String, required: true },
//     // avatar: { type: String, default: "https://res.cloudinary.com/dtdsw5fg2/image/upload/v1683544833/user_avatars/kitten-playing_xiwu5g.gif" },
//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user'
//     }
// }, { timestamps: true })


// const UserModel = mongoose.model("user", userSchema);
// export default UserModel





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