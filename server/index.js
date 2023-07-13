//NOTE - import all necessary things

import express from "express";
import mongoose from "mongoose";
import cloudinaryConfig from "./config/cloudinary.js";
import cors from "cors";
import passportConfig from "./config/passport.js";

import * as dotenv from "dotenv";
dotenv.config();

//NOTE -  Routes
import userRouter from "./routes/userRoutes.js";
import booksRouter from "./routes/booksRoutes.js";

// import petRouter from "./routes/petRoutes.js";

//NOTE - port

const app = express();
const port = process.env.PORT || 5000;



//NOTE - Middlewares & cors

const setMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
//REVIEW[epic=deploy, seq=2] once the client is deployed we can add the URL to the list of allowed Origins

  //REVIEW[epic=deploy, seq=3] the first origin should be the localhost port our client runs on. The second one, vercel's URL for our client
  const allowedOrigins = [
    "http://localhost:5174",
    "https://mern-stack-project-vercel-client.vercel.app",
  ];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  
  // app.use(cors());
 app.use(cors(corsOptions));
  cloudinaryConfig();
  passportConfig();
};



//NOTE - moongoose connection

const connectMongoose = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(port, () => {
        console.log(
          "Connection to MongoDB established, and server is running on port " +
            port
        );
      });
    })
    .catch((err) => console.log(err));
};

// app.listen(port, () => {
//     console.log("Server is running on port" + port);
// });

//NOTE - Endpoint

const connectRoutes = () => {
  app.use("/api/users", userRouter);
  app.use("/api/books", booksRouter);
  // app.use('/api/pets', petRouter);

//   app.use("*", (req, res) => {
//     res.status(500).json({ error: "Endpoint not found" });
//   });
console.log("routes loaded")
};

(async function controller() {
  setMiddlewares();
  connectMongoose();
  connectRoutes();
})() //NOTE this is an IIFE : Inmidiate Invoked Function

//NOTE -  for understanding code

// const helloFunction = (req, res) => {
//     res.send({ message: 'Hello World!', array: [1, 2, 3, 4, 5, 6] })
// }

// ***********same ****************
// app.post('/test', helloFunction);

// ***********same****************

// app.post('/test', (req, res) => {
// res.send({ message: 'Hello World!', array: [1, 2, 3, 4, 5, 6] })
// });

//NOTE - understanding (req, res, next)

// const controller = (req, res) => {
//     res.send('Hello World!!!!!!')
// }
// const middle = (req, res, next) => {
//     console.log("Running middleware")
//     next()
// }
// app.get('/', middle, controller)
