//REVIEW[epic=deploy, seq=5] to switch between working locally and with deployed URL, we could add some logic to detect in which mode we are
// The deployed URL could also be stored as .env variable, to hide it from the public.
// console.log("firimport.meta.env.MODEst", import.meta.env.MODE);

//NOTE for apps created with CRA, the env variable will be process.env.NODE_ENV
const serverURL =
process.env.NODE_ENV=== "development"
    ? "http://localhost:5001"
    : "https://mern-stack-project-vercel-server.vercel.app";

export { serverURL };