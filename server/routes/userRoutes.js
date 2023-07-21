import express from "express";
import multerUpload from "../middlewares/multer.js"
import { getUsers, getUserById, createUser, updateUser, deleteUser, login, getActiveUser } from "../controllers/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const userRouter = express.Router()



userRouter.get("/all", getUsers);
userRouter.get("/id/:id", getUserById);
userRouter.get("/active", jwtAuth, getActiveUser);


userRouter.post("/new", multerUpload.single("avatar"), createUser);
userRouter.post("/login", login);


userRouter.put("/update/:id",jwtAuth, multerUpload.single("avatar"), updateUser);


userRouter.delete("/delete/:id",jwtAuth, deleteUser); //NOTE do not forget that if we use jwtAuth, we need to send the token from the client

export default userRouter;

