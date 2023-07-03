import express from "express"
import multerUpload from "../middlewares/multer.js";
import { getAllbooks, addBook, getById, updateBook, deleteBook, commentsBook, uncommentsBook, } from "../controllers/booksController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
const booksRouter = express.Router()

//NOTE - get method
booksRouter.get("/all", getAllbooks);
booksRouter.get("/all/:id", getById);  //get by id

//NOTE - put method for update
booksRouter.put("/updatebook/:id", multerUpload.single("avatar"), updateBook) //update
// booksRouter.post("/authors/addbook/:authorId", multerUpload.single("image"), addBookToUserProfile);
booksRouter.put("/commentsbook/:id", jwtAuth, commentsBook)

//NOTE - delete method
booksRouter.delete("/deleteBook/:id", deleteBook)
booksRouter.delete("/uncommentsbook/:id", jwtAuth, uncommentsBook)

//NOTE - post method
booksRouter.post("/addbook", multerUpload.single("avatar"), addBook);  // to add product/book
// booksRouter.post("/users/addbook/:userId", multerUpload.single("avatar"), addBookToUserProfile);

export default booksRouter;






