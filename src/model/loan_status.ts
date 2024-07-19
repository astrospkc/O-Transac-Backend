import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const LoanStatusSchema = new Schema({
    loan_id: {
        type: String,
        required: true
    },
    amountToBePaid: {
        type: Number,
        required: true
    },
    interest: {
        type: Number,
        required: true
    },
    loanType: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    payment_remaining: {
        type: Number,
        required: true
    },


})

const LoanStatus = mongoose.model('LoanStatus', LoanStatusSchema);
export default LoanStatus