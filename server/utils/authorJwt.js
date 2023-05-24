import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

const generateAuthorToken = (existingAuthor) => {
    const payload = {
        sub: existingAuthor._id,
        msg: "Hello"
    };

    const options = {
        expiresIn: "7d",
    };

    const authorToken = jwt.sign(payload, process.env.JWT_SECRET, options);
    return authorToken
}

export { generateAuthorToken };
