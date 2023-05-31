import express from "express"
import multerUpload from "../middlewares/multer.js";
import { getAllbooks, addBook, getById, updateBook, deleteBook, commentsBook, uncommentsBook } from "../controllers/booksController.js";

const booksRouter = express.Router()

//NOTE - get method
booksRouter.get("/all", getAllbooks);
booksRouter.get("/all/:id", getById);  //get by id

//NOTE - put method for update
booksRouter.put("/updatebook/:id", multerUpload.single("image"), updateBook) //update

booksRouter.put("/commentsbook/:id", commentsBook)

//NOTE - delete method
booksRouter.delete("/deleteBook/:id", deleteBook)
booksRouter.delete("/uncommentsbook/:id", uncommentsBook)

//NOTE - post method
booksRouter.post("/addbook", multerUpload.single("image"), addBook);  // to add product/book

export default booksRouter;






