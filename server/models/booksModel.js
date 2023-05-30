import mongoose from "mongoose";
const commentschema = new mongoose.Schema({
    author: { type: String, required: true },
    text: { type: String, required: true }
}, { timestamps: true });

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "author" },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean },
    image: { type: String, required: true },
    comments: [commentschema]
}, { timestamps: true });

const BooksModel = mongoose.model("book", bookSchema);
export default BooksModel;

//NOTE - mongoDb by deafault makes book to books