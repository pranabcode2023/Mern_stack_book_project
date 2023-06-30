
// import express from "express";
// import multerUpload from "../middlewares/multer.js"
// import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor, login, getActiveAuthor } from "../controllers/authorControllers.js";
// import jwtAuth from "../middlewares/jwtAuth.js";

// const authorRouter = express.Router()

// //NOTE - get method
// authorRouter.get("/all", getAuthors);
// authorRouter.get("/id/:id", getAuthor);
// authorRouter.get("/active", jwtAuth, getActiveAuthor);

// //NOTE - put method
// authorRouter.put("/update/:id", multerUpload.single("image"), updateAuthor)

// //NOTE - delete method
// authorRouter.delete("/delete/:id", deleteAuthor)


// //NOTE - post method
// authorRouter.post("/new", multerUpload.single("image"), createAuthor);
// authorRouter.post("/login", login);

// // authorRouter.post("/update/:id", jwtAuth, updateAuthor);



// export default authorRouter;