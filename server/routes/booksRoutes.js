import express from "express"
import multerUpload from "../middlewares/multer.js";
import { getAllbooks, addBook, getById, updateBook, deleteBook, commentsBook, uncommentsBook, } from "../controllers/booksController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
const booksRouter = express.Router()



booksRouter.get("/all", getAllbooks);
booksRouter.get("/all/:id", getById);


booksRouter.put("/updatebook/:id", multerUpload.single("image"), updateBook) //update
booksRouter.put("/commentsbook/:id", jwtAuth, commentsBook)


booksRouter.delete("/deleteBook/:id", deleteBook)
booksRouter.delete("/uncommentsbook/:id", jwtAuth, uncommentsBook)

booksRouter.post("/addbook", multerUpload.single("image"), addBook);

export default booksRouter;





