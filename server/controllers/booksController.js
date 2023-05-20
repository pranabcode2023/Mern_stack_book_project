import BooksModel from "../models/booksModel.js";
import { imageUpload } from "../utils/imageManagement.js";

const getAllbooks = async (req, res) => {
    try {
        const books = await BooksModel.find();
        res.status(200).json({ books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong..." });
    }
};

const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await BooksModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: "No Book Found" });
        }
        res.status(200).json({ book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong..." });
    }
};

const addBook = async (req, res) => {
    try {
        const userBooks = await imageUpload(req.file, "user_books");
        const newBook = new BooksModel({
            ...req.body,
            userBooks: userBooks,
        });
        const savedBook = await newBook.save();
        res.status(201).json({ book: savedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to add the book" });
    }
};
const updateBook = async (req, res) => {
    const id = req.params.id;
    const { name, author, description, price, available, image } = req.body;
    try {
        const updatedBook = await BooksModel.findByIdAndUpdate(
            id,
            {
                name,
                author,
                description,
                price,
                available,
                image,
            },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Unable to update by this ID" });
        }
        res.status(200).json({ book: updatedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong..." });
    }
};

const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBook = await BooksModel.findByIdAndRemove(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Unable to delete by this ID" });
        }
        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong..." });
    }
};

export { getAllbooks, addBook, getById, updateBook, deleteBook };

