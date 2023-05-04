import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String, // String is shorthand for {type: String}
    userName: String,
    password: String,
    // picture: String,

    // admin: Boolean,

});
const userModel = mongoose.model('user', userSchema);
export default userModel