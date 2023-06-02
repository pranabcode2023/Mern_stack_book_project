
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";
// import { generateAuthorToken } from "../utils/authorJwt.js";
import { generateToken } from "../utils/Jwt.js";
import AuthorModel from "../models/authorModel.js";


const getAuthors = async (req, res) => {
    console.log("getAuthors called")
    try {
        const authors = await AuthorModel.find();
        // console.log(authors);
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
        const author = await AuthorModel.findById(id).populate({ path: "books" });
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
// const updateAuthor = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const existingAuthor = await AuthorModel.findById(id);
//         if (!existingAuthor) {
//             return res.status(404).json({ message: "Author not found" });
//         }

//         const image = req.file ? await imageUpload(req.file, "user_authors") : existingAuthor.image;

//         const updatedAuthorProfile = {
//             email: req.body.email || existingAuthor.email,
//             username: req.body.username || existingAuthor.username,
//             password: req.body.password ? await encryptPassword(req.body.password) : existingAuthor.password,
//             image: image,
//         };

//         const updatedAuthor = await AuthorModel.findByIdAndUpdate(id, updatedAuthorProfile, { new: true });
//         if (!updatedAuthor) {
//             return res.status(404).json({ message: "Unable to update this profile" });
//         }

//         res.status(200).json(updatedAuthor);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Unable to update the profile" });
//     }

//     // const me = req.user;
//     // try {
//     //     const updatedUser = await UserModel.findByIdAndUpdate(me._id, req.body, { new: true });
//     //     res.status(200).json(updatedUser);
//     // } catch (e) {
//     //     console.log(e);
//     //     res.status(500).send(e.message);
//     // }
// };

const updateAuthor = async (req, res) => {
    console.log('req.file>>>><', req.file)
    console.log('req.body>>>><', req.body)
    try {
        const image = await imageUpload(req.file, "user_authors");
        const updatedAuthorData = {
            ...req.body,
            image: image
        };
        const updatedAuthor = await AuthorModel.findByIdAndUpdate(req.params.id, updatedAuthorData, { new: true });

        if (!updatedAuthor) {
            return res.status(404).json({ message: "Unable to update by this ID" });
        }

        res.status(200).json({ author: updatedAuthor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to update the Author" });
    }
};








const deleteAuthor = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedAuthor = await AuthorModel.findByIdAndRemove(id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: "Unable to delete by this ID" });
        }
        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong..." });
    }
};


const login = async (req, res) => {
    // console.log('req>>>>', req)

    try {
        const existingAuthor = await AuthorModel.findOne({ email: req.body.email }).populate({ path: "books" });
        console.log('exisitingAuthor>>>>>', existingAuthor)
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
                const authorToken = generateToken(existingAuthor);
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
    console.log('req.user', req.user)
    res.status(200).json({
        _id: req.user._id,
        email: req.user.email,
        username: req.user.username,
        image: req.user.image,
        books: req.user.books
    });
}

export { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor, login, getActiveAuthor }