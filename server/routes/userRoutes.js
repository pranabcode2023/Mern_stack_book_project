import express from "express";
import multerUpload from "../middlewares/multer.js"
import { getUsers, getUserById, createUser, updateUser, deleteUser, login, getActiveUser } from "../controllers/userControllers.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const userRouter = express.Router()

//NOTE - get method
userRouter.get("/all", getUsers);
userRouter.get("/id/:id", getUserById);
userRouter.get("/active", jwtAuth, getActiveUser);


userRouter.post("/new", multerUpload.single("avatar"), createUser);
userRouter.post("/login", login);


userRouter.put("/update/:id", multerUpload.single("avatar"), updateUser);


userRouter.delete("/delete/:id", deleteUser);

export default userRouter;

