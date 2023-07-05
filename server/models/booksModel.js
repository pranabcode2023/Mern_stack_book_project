
import mongoose from "mongoose";
// const commentSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//     text: { type: String, required: true }
// }, { timestamps: true });

const commentSchema = new mongoose.Schema({
    authorId: { type: String, required: true, },
    author: { type: String, required: true, },
    authorName: { type: String, required: true, },
    text: { type: String, required: true, },
}, { timestamps: true });


const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // owner: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean },
    avatar: { type: String, required: true },
    likes: [{ type: String }],
    comments: [commentSchema]
}, { timestamps: true });

const BooksModel = mongoose.model("book", bookSchema);
export default BooksModel;

//NOTE - mongoDb by deafault makes book to books