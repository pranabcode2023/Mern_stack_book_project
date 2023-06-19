
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";
import { generateToken } from "../utils/Jwt.js";
import UserModel from "../models/authorModel.js";


const getUsers = async (req, res) => {
    console.log("getUsers called")
    try {
        const users = await UserModel.find();
        // console.log(authors);
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: "something went wrong..." })
        console.log(e);
    }
}

const getUser = async (req, res) => {
    const params = req.params;
    console.log(params); // should show { id: blahblah }
    const id = req.params.id;
    console.log(id); // will show just "blahblah"
    try {
        const user = await UserModel.findById(id).populate({ path: "books" });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong.." })
    }
}

const createUser = async (req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(406).json({ error: "Please fill out all fields" })
    }
    const image = await imageUpload(req.file, "user_users");
    const encryptedPassword = await encryptPassword(req.body.password);
    const newUser = new UserModel({
        ...req.body,
        password: encryptedPassword,
        image: image
    });
    try {
        const registeredUser = await newUser.save();
        res.status(200).json({
            message: "Successfully registered!",
            newAuthor: registeredUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("something went wrong..")
    }
}


const updateUser = async (req, res) => {
    console.log('req.file>>>><', req.file)
    console.log('req.body>>>><', req.body)
    try {
        const image = await imageUpload(req.file, "user_users");
        const updatedUserData = {
            ...req.body,
            image: image
        };
        const updatedUser = await UserModelModel.findByIdAndUpdate(req.params.id, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "Unable to update by this ID" });
        }

        res.status(200).json({ author: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to update the User" });
    }
};








const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await UserModelModel.findByIdAndRemove(id);
        if (!deletedUser) {
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
        const existingUser = await UserModel.findOne({ email: req.body.email }).populate({ path: "books" });
        console.log('existingUser>>>>>', existingUser)
        if (!existingUser) {
            res.status(404).json({ error: "no user found" })
            return;
        }
        if (existingUser) {
            const verified = await verifyPassword(req.body.password, existingUser.password);
            if (!verified) {
                res.status(406).json({ error: "password doesn't match" })
            }
            if (verified) {
                const userToken = generateToken(existingUser);
                res.status(200).json({
                    verified: true,
                    userToken: userToken,
                    user: {
                        _id: existingUser._id,
                        username: existingUser.username,
                        books: existingUser.books,
                        image: existingUser.image
                    }
                })
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "something went wrong.." })
    }
}

const getActiveUser = async (req, res) => {
    console.log('req.user', req.user)
    res.status(200).json({
        _id: req.user._id,
        email: req.user.email,
        username: req.user.username,
        image: req.user.image,
        books: req.user.books
    });
}

export { getUsers, getUser, createUser, updateUser, deleteUser, login, getActiveUser }





// import UserModel from "../models/userModels.js";
// import { generateToken } from "../utils/Jwt.js";
// import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
// import { imageUpload } from "../utils/imageManagement.js";


// const testingRoute = (req, res) => {
//     res.send('testing users route....')
// }

// const getUsers = async (req, res) => {
//     try {
//         const users = await UserModel.find();
//         console.log(users);
//         res.status(200).json(users);
//     } catch (e) {
//         res.status(500).json({ error: "something went wrong..." })
//         console.log(e);
//     }
// }

// const getUser = async (req, res) => {
//     const params = req.params;
//     console.log(params); // should show { id: blahblah }
//     const id = req.params.id;
//     console.log(id); // will show just "blahblah"
//     try {
//         const user = await UserModel.findById(id).populate("pets");
//         res.status(200).json(user);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "something went wrong.." })
//     }
// }

// const createUser = async (req, res) => {
//     console.log(req.body);
//     if (!req.body.email || !req.body.password || !req.body.username) {
//         return res.status(406).json({ error: "Please fill out all fields" })
//     }
//     const avatar = await imageUpload(req.file, "user_avatars");
//     const encryptedPassword = await encryptPassword(req.body.password);
//     const newUser = new UserModel({
//         ...req.body,
//         password: encryptedPassword,
//         avatar: avatar
//     });
//     try {
//         const registeredUser = await newUser.save();
//         res.status(200).json({
//             message: "Successfully registered!",
//             newUser: registeredUser
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("something went wrong..")
//     }
// }

// const updateUser = async (req, res) => {
//     const me = req.user;
//     try {
//         const updatedUser = await UserModel.findByIdAndUpdate(me._id, req.body, { new: true });
//         res.status(200).json(updatedUser);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send(e.message);
//     }
// }

// const login = async (req, res) => {
//     try {
//         const existingUser = await UserModel.findOne({ email: req.body.email });
//         if (!existingUser) {
//             res.status(404).json({ error: "no user found" })
//             return;
//         }
//         if (existingUser) {
//             const verified = await verifyPassword(req.body.password, existingUser.password);
//             if (!verified) {
//                 res.status(406).json({ error: "password doesn't match" })
//             }
//             if (verified) {
//                 const token = generateToken(existingUser);
//                 res.status(200).json({
//                     verified: true,
//                     token: token,
//                     user: {
//                         _id: existingUser._id,
//                         username: existingUser.username,
//                         pets: existingUser.pets,
//                         avatar: existingUser.avatar
//                     }
//                 })
//             }
//         }
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ error: "something went wrong.." })
//     }
// }

// const getActiveuser = async (req, res) => {
//     res.status(200).json({
//         _id: req.user._id,
//         email: req.user.email,
//         username: req.user.username,
//         avatar: req.user.avatar,
//         pets: req.user.pets
//     });
// }

// export { testingRoute, getUsers, getUser, createUser, updateUser, login, getActiveuser }