import mongoose, { Schema } from "mongoose";

interface CustomerInstance {
  fullname: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  notes: string;
}

const CustomerSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    gender: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String,required: true},
    notes: {type: String}

}, {timestamps: true}) 

const Customer = mongoose.model<CustomerInstance>("Customer", CustomerSchema);

export default Customer;