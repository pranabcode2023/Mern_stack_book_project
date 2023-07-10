// import express from "express"
// import multerUpload from "../middlewares/multer.js";
// import { getAllbooks, addBook, getById, updateBook, deleteBook, commentsBook, uncommentsBook, } from "../controllers/booksController.js";
// import jwtAuth from "../middlewares/jwtAuth.js";
// const booksRouter = express.Router()



// booksRouter.get("/all", getAllbooks);
// booksRouter.get("/all/:id", getById);


// booksRouter.put("/updatebook/:id", multerUpload.single("image"), updateBook) //update
// booksRouter.put("/commentsbook/:id", jwtAuth, commentsBook)


// booksRouter.delete("/deleteBook/:id", deleteBook)
// booksRouter.delete("/uncommentsbook/:id", jwtAuth, uncommentsBook)

// booksRouter.post("/addbook", multerUpload.single("image"), addBook);

// export default booksRouter;






import express from "express"
import { getAllBooks, createBook, createComment, addOrRemoveLike, deleteBook, deleteComment, updateBook, getAllComments, } from "../controllers/booksController.js"
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const booksRouter = express.Router();

booksRouter.get("/all", getAllBooks)
booksRouter.get("/allcomments/:bookId", jwtAuth, getAllComments);



booksRouter.post("/new",jwtAuth, multerUpload.single("image"), createBook);
// booksRouter.post("/new", multerUpload.single("image"), createBook);
booksRouter.post("/comments/:bookId", jwtAuth, createComment);



booksRouter.put("/likes/:bookId", jwtAuth, addOrRemoveLike);
booksRouter.put("/update/:bookId",jwtAuth, multerUpload.single("image"),  updateBook);


booksRouter.delete("/delete/:bookId", jwtAuth, deleteBook);
booksRouter.delete("/delete/:bookId/comments/:commentId", jwtAuth, deleteComment);



export default booksRouter;