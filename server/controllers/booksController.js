
import BooksModel from "../models/booksModel.js";
import { imageUpload } from "../utils/imageManagement.js";


const getAllBooks = async (req, res) => {
    try {
        const books = await BooksModel.find().populate({ path: "owner", select: ["username", "email", "avatar"] })
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong..." });
        console.log(error);
    }
};



const getAllComments = async (req, res) => {
    const userId = req.user._id;
    const { bookId } = req.params;
    console.log("getAllcomments server----------", bookId);
    try {
        const book = await BooksModel.findById(bookId);
        console.log("allComments ln 64 >>>", book);
        res.status(200).json({
            msg: `all comments from book :${bookId}`,
            book,
        });
    } catch (error) {
        console.log("error showing all comments >>>>", error);
    }
};



const createBook = async (req, res) => {
    const userId = req.user._id; // The jwtAuth middleware decoding the token from the Authorization-header request and attaching the user's info in the req.user object.

    if (!req.body.name || !req.body.description || !req.body.price) {
        return res.status(406).json({ error: "Please fill out all required fields" });
    }

    const image = await imageUpload(req.file, "user_books");
    // "user_books" represent the folder, it will create a folder if not exist already.

    const newBook = new BooksModel({
        ...req.body,
        image: image,
        owner: userId, // Use the userId from the token
        likes: [], // Initialize the likes array as empty
        Comments: []
    });




    try {
        const createdBook = await newBook.save();
        console.log(createdBook);

        // Find the user by the owner field and update their books array
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { books: createdBook._id } },
            { new: true, useFindAndModify: false }
        );



        console.log("User'books array updated successfully:", updatedUser.books);
        res.status(200).json({ msg: "book successfully created!", newBook: createdBook });
    } catch (e) {
        console.log(e);
        res.status(500).json({ eroor: "Something went wrong while creating the book." });
    }

};




const createComment = async (req, res) => {
    const userId = req.user._id; // The jwtAuth middleware decoding the token from the Authorization-header request and attaching the user's info in the req.user object.
    const { bookId } = req.params; // Get the book ID from the request params

    try {
        // Validate comment text
        const commentText = req.body.text;
        if (!commentText) {
            return res.status(400).json({ error: "Please fill out all required fields" });
        }

        // Find the book by its ID
        const book = await BooksModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Find the user by its ID
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a new comment
        const comment = {
            authorId: userId,
            authorName: user.username,
            authorImage: user.avatar, // assuming the user's profile image is stored in a field named avatar
            text: commentText
        };

        // Add the comment to the book's comments array
        book.Comments.push(comment);

        // Save the updated book and the new comment
        await book.save();

        res.status(200).json({ msg: "Successfully added comment", book });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Something went wrong while adding a comment." });
    }
};



const addOrRemoveLike = async (req, res) => {
    const userId = req.user._id; // The jwtAuth middleware decoding the token from the Authorization-header request and attaching the user's info in the req.user object.
    const { bookId } = req.params; // Get the succulent ID from the request params

    try {
        // Find the succulent by its ID
        const book = await BooksModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Check if the user's ID exists in the likes array
        const index = book.likes.indexOf(userId);
        let message = "";
        if (index === -1) {
            // If the user's ID doesn't exist in the likes array, add it
            book.likes.push(userId);
            message = "Successfully added like";
        } else {
            // If the user's ID exists in the likes array, remove it
            book.likes.splice(index, 1);
            message = "Successfully removed like";
        }

        // Save the updated book
        await book.save();

        res.status(200).json({ msg: message, book });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Something went wrong while updating likes." });
    }
};


const deleteBook = async (req, res) => {
    const userId = req.user._id; // Get the user's ID from the request.
    const { bookId } = req.params; // Get the book ID from the request params

    try {
        let book; //  Declaring it outside so I'll be able to use it again in this func outside this try&catch block.
        try {
            // Attempt to find the succulent by its ID
            book = await BooksModel.findById(bookId);
        } catch (error) {
            // Handle the error if the succulent is not found
            return res.status(404).json({ error: "book not found" });
        }

        // Check if the user is the owner of the succulent or the user is an admin
        if (book.owner.toString() !== userId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: "Keep your fingers to yourself!" });
        }

        // Delete the book
        await BooksModel.findByIdAndRemove(bookId);

        // Remove the book from the user's succulents array
        await UserModel.updateOne(
            { _id: book.owner },
            { $pull: { books: bookId } }
        );

        res.status(200).json({ msg: "Book successfully deleted!" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Something went wrong while deleting the succulent." });
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////

const deleteComment = async (req, res) => {
    try {
        const { bookId, commentId } = req.params;
        const userId = req.user._id;

        const book = await BooksModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        const comment = book.Comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.authorId.toString() !== userId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: "Keep your fingers to yourself!" });
        }

        // Remove the comment from the Comments array
        book.Comments.pull(commentId);

        await book.save();

        res.status(200).json({ msg: "Comment successfully deleted!", book });
    } catch (e) {
        res.status(500).json({ msg: "Something went wrong while deleting the comment." });
    }
};



const updateBook = async (req, res) => {
    try {
        // Get the book ID from the request params
        const bookIdToUpdate = req.params.bookId;

        let updatedData = { ...req.body };

        // Fetch the book data
        const book = await BooksModel.findById(bookIdToUpdate);

        // If book not found, return error
        if (!book) {
            return res.status(404).json({ error: "book not found" });
        }

        // Check if the user is the owner of the book or an admin
        if (book.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: "for Admin!" });
        }

        // Check if there's a new image and upload it
        if (req.file) {
            updatedData.img = await imageUpload(req.file, "user_books"); // "user_books" is the folder where you store book images
        }

        // Update the book with the new data
        const updatedBook = await BooksModel.findByIdAndUpdate(bookIdToUpdate, updatedData, { new: true });

        // Return updated book
        res.status(200).json({ msg: "Book successfully updated!", updatedBook });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Something went wrong with updating the book." });
    }
};

export { getAllBooks, createBook, createComment, addOrRemoveLike, deleteBook, deleteComment, updateBook, getAllComments, };



// import BooksModel from "../models/booksModel.js";
// import { imageUpload } from "../utils/imageManagement.js";

// const getAllbooks = async (req, res) => {
//     try {
//         const books = await BooksModel.find();
//         res.status(200).json({ books });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Something went wrong..." });
//     }
// };

// const getById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const book = await BooksModel.findById(id).populate({ path: "user" });
//         if (!book) {
//             return res.status(404).json({ message: "No Book Found" });
//         }
//         res.status(200).json({ book });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Something went wrong..." });
//     }
// };

// const addBook = async (req, res) => {
//     console.log('req.file>>>>>>', req.file)
//     console.log('req.body>>>>>>', req.body)

//     try {
//         const avatar = await imageUpload(req.file, "user_books");
//         const newBook = new BooksModel({
//             ...req.body,
//             avatar: avatar
//         });
//         const savedBook = await newBook.save();
//         res.status(201).json({ book: savedBook });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Unable to add the book" });
//     }
// };



// const updateBook = async (req, res) => {
//     console.log('req.file>>>><', req.file)
//     console.log('req.body>>>><', req.body)
//     try {
//         const avatar = await imageUpload(req.file, "user_books");
//         const updatedBookData = {
//             ...req.body,
//             avatar: avatar
//         };
//         const updatedBook = await BooksModel.findByIdAndUpdate(req.params.id, updatedBookData, { new: true });

//         if (!updatedBook) {
//             return res.status(404).json({ message: "Unable to update by this ID" });
//         }

//         res.status(200).json({ book: updatedBook });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Unable to update the book" });
//     }
// };

// const commentsBook = async (req, res) => {

//     const newComments = {
//         ...req.body,
//         user: req.user._id
//     };
//     console.log(newComments)
//     // res.send("testing")
//     try {
//         //NOTE - moongoose push method
//         const comments = await BooksModel.findByIdAndUpdate(req.params.id, { $push: { comments: newComments } }, { new: true });
//         res.status(200).json({ message: "comments added" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong..." });
//     }
// };

// const uncommentsBook = async (req, res) => {
//     const id = req.params.id;
//     const userId = req.user._id
//     const commentUser = req.body.user
//     const check = userId.equals(commentUser) //NOTE - mongoose equal method

//     // const isEqual = user._id.equals(oid)
//     // res.send(check)

//     if (check) {
//         try {
//             const uncommentsBook = await BooksModel.findByIdAndRemove(id, { $pull: { comments: { _id: req.body.delete } } }, { new: true });
//             if (!uncommentsBook) {
//                 return res.status(404).json({ message: "Unable to delete by this ID" });
//             }
//             res.status(200).json({ message: "Successfully Deleted" });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ message: "Something went wrong..." });
//         }
//     }
//     else {
//         res.status(403).json({ message: "you can't delete someone comment" })
//     }
// };

// const deleteBook = async (req, res) => {
//     const id = req.params.id;
//     try {
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

// export { getAllbooks, addBook, getById, updateBook, deleteBook, commentsBook, uncommentsBook };

