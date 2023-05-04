// import UserModel from "../models/userModels.js"

// const testingRoute = (req, res) => {
//     res.send('testing users route....')
// }

// const getUsers = async (req, res) => {
//     try {
//         const users = await UserModel.find({})
//         console.log(users)
//         res.status(200).json({
//             usersNumber: users.length,
//             users
//         })
//     } catch (error) {
//         res.status(500).json({
//             error: "something went wrong"
//         })
//         console.log("error", error)
//     }
// }

// const getUser = async (req, res) => {
//     const id = req.params;
//     try {
//         const user = await UserModel.findOne({ _id: id });
//         res.status(200).json(user)
//     } catch (error) {
//         // console.log(error)
//         res.status(500).json({ error: "somthing went wrong" })

//     }
// }

// export { testingRoute, getUsers, getUser }

import UserModel from "../models/userModels.js";

const testingRoute = (req, res) => {
    res.send('testing users route....')
}

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        console.log(users);
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
        const user = await UserModel.findById(id).populate("pets");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong.." })
    }
}

export { testingRoute, getUsers, getUser }