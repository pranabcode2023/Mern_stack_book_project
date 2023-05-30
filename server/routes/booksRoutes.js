import express from "express"
import multerUpload from "../middlewares/multer.js";
import { getAllbooks, addBook, getById, updateBook, deleteBook, commentsBook } from "../controllers/booksController.js";

const booksRouter = express.Router()

//NOTE - get method
booksRouter.get("/all", getAllbooks);
booksRouter.get("/all/:id", getById);  //get by id

//NOTE - put method
booksRouter.put("/updatebook/:id", multerUpload.single("image"), updateBook) //update
booksRouter.put("/commentsbook/:id", commentsBook)

//NOTE - delete method
booksRouter.delete("/deleteBook/:id", deleteBook)

//NOTE - post method
booksRouter.post("/addbook", multerUpload.single("image"), addBook);  // to add product/book

export default booksRouter;






