import express from "express";
import multerUpload from "../middlewares/multer.js"
import { getUsers, getUser, createUser, updateUser, deleteUser, login, getActiveUser } from "../controllers/userControllers.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const userRouter = express.Router()

//NOTE - get method
userRouter.get("/all", getUsers);
userRouter.get("/id/:id", getUser);
userRouter.get("/active", jwtAuth, getActiveUser);

//NOTE - put method
// userRouter.put("/update/:id", multerUpload.single("avatar"), updateUser)
userRouter.put("/updateuser/:id", multerUpload.single("avatar"), updateUser)

//NOTE - delete method
userRouter.delete("/delete/:id", deleteUser)


//NOTE - post method
userRouter.post("/new", multerUpload.single("avatar"), createUser);
userRouter.post("/login", login);
// userRouter.post("/update", jwtAuth, updateUser);

export default userRouter;




// import express from "express";
// import multerUpload from "../middlewares/multer.js"
// import { testingRoute, getUsers, getUser, createUser, updateUser, login, getActiveuser } from "../controllers/userControllers.js";
// import jwtAuth from "../middlewares/jwtAuth.js";

// const userRouter = express.Router()

// userRouter.get("/test", testingRoute)
// userRouter.get("/all", getUsers);
// userRouter.get("/id/:id", getUser);
// userRouter.get("/active", jwtAuth, getActiveuser);


// userRouter.post("/new", multerUpload.single("avatar"), createUser);
// userRouter.post("/update", jwtAuth, updateUser);
// userRouter.post("/login", login);

// export default userRouter;