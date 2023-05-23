// import BooksModel from "../models/booksModel.js"

// const getAllbooks = async (req, res) => {
//     let books;
//     try {

//         books = await BooksModel.find()
//     } catch (error) {
//         console.log(error)
//     }
//     if (!books) {
//         return res.status(404).json({ meassage: "No books Found" })
//     }
//     return res.status(200).json({ books })
// };


// const getById = async (req, res) => {
//     const id = req.params.id
//     let book;
//     try {
//         book = await BooksModel.findById(id)
//     } catch (error) {
//         console.log(error)
//     }
//     if (!book) {
//         return res.status(404).json({ meassage: "No Book Found" })
//     }
//     return res.status(200).json({ book })
// }

// const addBook = async (req, res) => {
//     let book;
//     const { name, author, description, price, available, image } = req.body;

//     try {
//         book = new BooksModel({
//             name,
//             author,
//             description,
//             price,
//             available,
//             image
//         });
//         newBook = await book.save();
//     } catch (error) {
//         console.log(error)
//     }
//     if (!book) {
//         return res.status(500).json({ meassage: "unable to add" })
//     }
//     return res.status(201).json({ book })
// };

// const updateBook = async (req, res) => {
//     const id = req.params.id
//     const { name, author, description, price, available, image } = req.body;
//     let book;
//     try {
//         book = await BooksModel.findByIdAndUpdate(id, {
//             name,
//             author,
//             description,
//             price,
//             available,
//             image
//         })
//     } catch (error) {
//         console.log(error)
//     }
//     if (!book) {
//         return res.status(404).json({ meassage: "Unable to update by this ID" })
//     }
//     return res.status(200).json({ book })
// }

// const deleteBook = async (req, res) => {
//     const id = req.params.id
//     const { name, author, description, price, available } = req.body;
//     let book;
//     try {
//         book = await BooksModel.findByIdAndRemove(id)
//     } catch (error) {
//         console.log(error)
//     }
//     if (!book) {
//         return res.status(404).json({ meassage: "Unable to delete by this ID" })
//     }
//     return res.status(200).json({ Message: 'Succesfully Deleted' })
// }

// export { getAllbooks, addBook, getById, updateBook, deleteBook };






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
        const image = await imageUpload(req.file, "user_books");
        const newBook = new BooksModel({
            ...req.body,
            image: image
        });
        const savedBook = await newBook.save();
        res.status(201).json({ book: savedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to add the book" });
    }
};


// const updateBook = async (req, res) => {
//     const id = req.params.id;
//     const { name, author, description, price, available, image } = req.body;
//     try {
//         const updatedBook = await BooksModel.findByIdAndUpdate(
//             id,
//             {
//                 name,
//                 author,
//                 description,
//                 price,
//                 available,
//                 image,
//             },
//             { new: true }
//         );

//         if (!updatedBook) {
//             return res.status(404).json({ message: "Unable to update by this ID" });
//         }
//         res.status(200).json({ book: updatedBook });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong..." });
//     }
// };
const updateBook = async (req, res) => {
    try {
        const image = await imageUpload(req.file, "user_books");
        const updatedBookData = {
            ...req.body,
            image: image
        };
        const updatedBook = await BooksModel.findByIdAndUpdate(req.params.id, updatedBookData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Unable to update by this ID" });
        }

        res.status(200).json({ book: updatedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to update the book" });
    }
};




// const deleteBook = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const image = await imageUpload(req.file, "user_books");
//         const updatedBookData = {
//             ...req.body,
//             image: image
//         };
//         const deletedBook = await BooksModel.findByIdAndRemove(id);
//         if (!deletedBook) {
//             return res.status(404).json({ message: "Unable to delete by this ID" });
//         }
//         res.status(200).json({ message: "Successfully Deleted" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong..." });
//     }
// };



const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
        const image = await imageUpload(req.file, "user_books");
        const deletedBookData = {
            ...req.body,
            image: image
        };
        const deletedBook = await BooksModel.findByIdAndRemove(req.params.id, deletedBookData, { new: true });
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


