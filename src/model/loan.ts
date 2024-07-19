import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
const { Schema } = mongoose




const LoanSchema = new Schema({
    // id: {
    //     type: Number,
    //     required: true
    // },
    accountNumber: {
        type: Number,
        required: true

    },
    principleAmount: {
        type: Number,
        required: true
    },

    loanType: {
        type: String,
        required: true
    },
    rateOfInterest: {
        type: Number,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },
    amountToBePaid: {
        type: Number,
        required: true
    },
    emi_per_month: {
        type: Number,
        required: true
    },
    monthly_interest: {
        type: Number,
        required: true
    }

})

const Loan = mongoose.model('Loan', LoanSchema)
export default Loan