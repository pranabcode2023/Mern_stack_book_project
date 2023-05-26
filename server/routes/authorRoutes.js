
import express from "express";
import multerUpload from "../middlewares/multer.js"
import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor, login, getActiveAuthor } from "../controllers/authorControllers.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const authorRouter = express.Router()


authorRouter.get("/all", getAuthors);
authorRouter.get("/id/:id", getAuthor);

authorRouter.get("/active", jwtAuth, getActiveAuthor);


authorRouter.put("/update/:id", multerUpload.single("image"), updateAuthor)

authorRouter.delete("/delete/:id", deleteAuthor)


authorRouter.post("/new", multerUpload.single("image"), createAuthor);

authorRouter.post("/update", jwtAuth, updateAuthor);
authorRouter.post("/login", login);


export default authorRouter;