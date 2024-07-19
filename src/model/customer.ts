import mongoose from "mongoose";
import Account from "./account";

const { Schema } = mongoose;

const CustomerSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true,

    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // accountNumber: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Account',
    //     // required: true
    // }

})

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer