
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";
import { generateAuthorToken } from "../utils/authorJwt.js";
import AuthorModel from "../models/authorModel.js";


const getAuthors = async (req, res) => {
    console.log("getAuthors called")
    try {
        const authors = await AuthorModel.find();
        console.log(authors);
        res.status(200).json(authors);
    } catch (e) {
        res.status(500).json({ error: "something went wrong..." })
        console.log(e);
    }
}

const getAuthor = async (req, res) => {
    const params = req.params;
    console.log(params); // should show { id: blahblah }
    const id = req.params.id;
    console.log(id); // will show just "blahblah"
    try {
        const author = await AuthorModel.findById(id).populate("books");
        res.status(200).json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong.." })
    }
}

const createAuthor = async (req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(406).json({ error: "Please fill out all fields" })
    }
    const image = await imageUpload(req.file, "user_authors");
    const encryptedPassword = await encryptPassword(req.body.password);
    const newAuthor = new AuthorModel({
        ...req.body,
        password: encryptedPassword,
        image: image
    });
    try {
        const registeredAuthor = await newAuthor.save();
        res.status(200).json({
            message: "Successfully registered!",
            newAuthor: registeredAuthor
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("something went wrong..")
    }
}

const updateAuthor = async (req, res) => {
    const me = req.author;
    try {
        const updatedAuthor = await AuthorModel.findByIdAndUpdate(me._id, req.body, { new: true });
        res.status(200).json(updatedAuthor);
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
}

const login = async (req, res) => {
    try {
        const existingAuthor = await AuthorModel.findOne({ email: req.body.email });
        if (!existingAuthor) {
            res.status(404).json({ error: "no user found" })
            return;
        }
        if (existingAuthor) {
            const verified = await verifyPassword(req.body.password, existingAuthor.password);
            if (!verified) {
                res.status(406).json({ error: "password doesn't match" })
            }
            if (verified) {
                const authorToken = generateAuthorToken(existingAuthor);
                res.status(200).json({
                    verified: true,
                    authorToken: authorToken,
                    user: {
                        _id: existingAuthor._id,
                        username: existingAuthor.username,
                        books: existingAuthor.books,
                        image: existingAuthor.image
                    }
                })
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "something went wrong.." })
    }
}

const getActiveAuthor = async (req, res) => {
    res.status(200).json({
        _id: req.author._id,
        email: req.author.email,
        username: req.author.username,
        image: req.author.image,
        books: req.author.books
    });
}

export { getAuthors, getAuthor, createAuthor, updateAuthor, login, getActiveAuthor }