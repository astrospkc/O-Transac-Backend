import mongoose from "mongoose";
// import Customer from "./customer";

const { Schema } = mongoose;

const AccountSchema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})


const Account = mongoose.model('Account', AccountSchema);
export default Account