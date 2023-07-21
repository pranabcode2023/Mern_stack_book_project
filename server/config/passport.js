import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/userModel.js';


import * as dotenv from "dotenv";
dotenv.config();


const passportConfig = () => {

    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }

    const myStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
     
      //NOTE -  use for userModel
       
       UserModel.findById(jwt_payload.sub).then((user) => {
            return user ? done(null, user) : done(null, false)
        }).catch(error => {
            return done(error, false);
        })

    });

    passport.use(myStrategy);

}

export default passportConfig;


