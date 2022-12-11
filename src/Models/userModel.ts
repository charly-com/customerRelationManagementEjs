import mongoose, { Schema } from "mongoose";

interface UserInstance {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  access_token: string;
}

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    confirm_password: {type: String, required: true},
    access_token: {type: String}

}, {timestamps: true})

const User = mongoose.model<UserInstance>("User", UserSchema);

export default User;