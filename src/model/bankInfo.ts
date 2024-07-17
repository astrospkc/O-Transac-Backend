
import mongoose from "mongoose";
const { Schema } = mongoose

const BankInfoSchema = new Schema({
    BankName: {
        type: String,
        required: true
    },
    AccountNumber: {
        type: Number,
        required: true
    },
    AccountHolderName: {
        type: String,
        required: true
    },
    AccountType: {
        type: String,
        reequired: true
    },
    IFSC: {
        type: String,
        reequired: true
    },
    Address: {
        type: String,
        reequired: true
    },
})

const BankInfo = mongoose.model('BankInfo', BankInfoSchema)
export default BankInfo
