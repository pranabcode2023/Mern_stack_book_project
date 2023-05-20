import express from "express"
import { multerUpload } from "../middlewares/multer.js";
import { getAllbooks, addBook, getById, updateBook, deleteBook } from "../controllers/booksController.js";

const booksRouter = express.Router()


booksRouter.get("/all", getAllbooks);
booksRouter.get("/all/:id", getById);  //get by id

booksRouter.put("/all/:id", updateBook) //update

booksRouter.delete("/all/:id", deleteBook)

booksRouter.post("/all", multerUpload.single("image"), addBook);  // to add product/book

export default booksRouter;






