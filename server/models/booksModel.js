import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    authorId: { type: String, required: true, },
    authorName: { type: String, required: true, },
    authorImage: { type: String, required: true, },
    // authorImage: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    // userInfo:[{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // this option would be in case you prefer not to take the user image url from the context when creating the message.
    text: { type: String, required: true, },
}, { timestamps: true });

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true },
    userWhoPosted: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    // available: { type: Boolean },
    image: { type: String, required: true },
    likes: [{ type: String }],
    Comments: [commentSchema]
}, { timestamps: true });

const BooksModel = mongoose.model("book", bookSchema);
export default BooksModel;

//NOTE - mongoDb by deafault makes book to books

// import mongoose from "mongoose";
// const commentschema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//     text: { type: String, required: true }
// }, { timestamps: true });

// const bookSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     // user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//     user: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     available: { type: Boolean },
//     avatar: { type: String, required: true },
//     comments: [commentschema]
// }, { timestamps: true });

// const BooksModel = mongoose.model("book", bookSchema);
// export default BooksModel;

// //NOTE - mongoDb by deafault makes book to books