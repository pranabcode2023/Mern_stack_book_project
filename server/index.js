import express from "express";
import mongoose from "mongoose";
import cloudinaryConfig from "./config/cloudinary.js";

import * as dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import petRouter from "./routes/petRoutes.js";


const app = express();
const port = process.env.PORT || 5000;


const setMiddlewares = () => {
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use(cors());
    cloudinaryConfig();
}


const connectMongoose = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(port, () => {
                console.log("Connection to MongoDB established, and server is running on port " + port);
            });
        })
        .catch((err) => console.log(err));
}

// app.listen(port, () => {
//     console.log("Server is running on port" + port);
// });

const connectRoutes = () => {
    app.use('/api/users', userRouter);
    app.use('/api/pets', petRouter);
    app.use('*', (req, res) => { res.status(500).json({ error: "Endpoint not found" }) });
}

// const helloFunction = (req, res) => {
//     res.send({ message: 'Hello World!', array: [1, 2, 3, 4, 5, 6] })
// }

// ***********same ****************
// app.post('/test', helloFunction);

// ***********same****************

// app.post('/test', (req, res) => {
// res.send({ message: 'Hello World!', array: [1, 2, 3, 4, 5, 6] })
// });

setMiddlewares();
connectMongoose();
connectRoutes();