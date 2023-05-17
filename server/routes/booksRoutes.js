import express from "express"
import { getAllbooks, addBook, getById, updateBook, deleteBook } from "../controllers/booksController.js";

const booksRouter = express.Router()


booksRouter.get("/all", getAllbooks);
booksRouter.get("/all/:id", getById);  //get by id

booksRouter.put("/all/:id", updateBook) //update

booksRouter.delete("/all/:id", deleteBook)

booksRouter.post("/all", addBook);  // to add product/book

export default booksRouter;






