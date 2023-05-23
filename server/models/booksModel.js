import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean },
    image: { type: String, required: true }
}, { timestamps: true });

const BooksModel = mongoose.model("book", bookSchema);
export default BooksModel;

//NOTE - mongoDb by deafault makes book to books