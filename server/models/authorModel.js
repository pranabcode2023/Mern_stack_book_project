import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: String,
    password: { type: String, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    image: { type: String }
    // image: { type: String, default: "https://res.cloudinary.com/dtdsw5fg2/image/upload/v1683544833/user_avatars/kitten-playing_xiwu5g.gif" }
}, { timestamps: true })


const AuthorModel = mongoose.model("author", authorSchema);
export default AuthorModel