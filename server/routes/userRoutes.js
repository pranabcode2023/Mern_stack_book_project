import express from "express"
import { getAllUsers, testingRoute } from "../controllers/userControllers.js"
const userRouter = express.Router()

userRouter.get("/test", testingRoute)
userRouter.get("/allusers", getAllUsers)


export default userRouter