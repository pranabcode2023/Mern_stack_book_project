import BooksModel from "../models/booksModel.js"
// import { imageUpload } from "../utils/imageManagement.js";


const getAllbooks = async (req, res) => {
    // try {
    //     const books = await booksModel.find();
    //     res.status(200).json(pet);
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({ error: "something went wrong......" })
    // }
    let books;
    try {

        books = await BooksModel.find()
    } catch (error) {
        console.log(error)
    }
    if (!books) {
        return res.status(404).json({ meassage: "No books Found" })
    }
    return res.status(200).json({ books })
};


const getById = async (req, res) => {
    const id = req.params.id
    let book;
    try {
        book = await BooksModel.findById(id)
    } catch (error) {
        console.log(error)
    }
    if (!book) {
        return res.status(404).json({ meassage: "No Book Found" })
    }
    return res.status(200).json({ book })
}

const addBook = async (req, res) => {

    // const bookImageUpload = await imageUpload(req.file, "user_books");
    // const newBook = new BooksModel({
    //     ...req.body,
    //     bookImageUpload: bookImageUpload
    // });

    let book;
    const { name, author, description, price, available, image } = req.body;

    try {
        book = new BooksModel({
            name,
            author,
            description,
            price,
            available,
            image
        });
        newBook = await book.save();
    } catch (error) {
        console.log(error)
    }
    if (!book) {
        return res.status(500).json({ meassage: "unable to add" })
    }
    return res.status(201).json({ book })
};

const updateBook = async (req, res) => {
    const id = req.params.id
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
        book = await BooksModel.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available,
            image
        })
    } catch (error) {
        console.log(error)
    }
    if (!book) {
        return res.status(404).json({ meassage: "Unable to update by this ID" })
    }
    return res.status(200).json({ book })
}

const deleteBook = async (req, res) => {
    const id = req.params.id
    const { name, author, description, price, available } = req.body;
    let book;
    try {
        book = await BooksModel.findByIdAndRemove(id)
    } catch (error) {
        console.log(error)
    }
    if (!book) {
        return res.status(404).json({ meassage: "Unable to delete by this ID" })
    }
    return res.status(200).json({ Message: 'Succesfully Deleted' })
}





export { getAllbooks, addBook, getById, updateBook, deleteBook };
