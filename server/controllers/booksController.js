import BooksModel from "../models/booksModel.js"


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
    let book;
    const { name, author, description, price, available } = req.body;

    try {
        book = new BooksModel({
            name,
            author,
            description,
            price,
            available
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
    const { name, author, description, price, available } = req.body;
    let book;
    try {
        book = await BooksModel.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available
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
        return res.status(404).json({ meassage: "Unable to update by this ID" })
    }
    return res.status(200).json({ book })
}





export { getAllbooks, addBook, getById, updateBook, deleteBook };
