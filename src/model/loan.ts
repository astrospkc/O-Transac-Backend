import mongoose from 'mongoose'
const { Schema } = mongoose

const PaymentSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    loanId: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    }
});


const LoanSchema = new Schema({
    // id: {
    //     type: Number,
    //     required: true
    // },
    PrincipleAmount: {
        type: Number,
        required: true
    },
    RevisedPrincipleAmount: {
        type: Number,
        required: true
    },
    RateOfInterest: {
        type: Number,
        required: true
    },

    Duration: {
        type: Date,
        required: true
    },
    Payment: [PaymentSchema],


})

const Loan = mongoose.model('Loan', LoanSchema)
export default Loan