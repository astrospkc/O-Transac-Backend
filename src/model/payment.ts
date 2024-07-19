import mongoose from 'mongoose';

const { Schema } = mongoose


const PaymentSchema = new Schema({

    loan_id: {
        type: String,
        required: true
    },
    total_amount_to_pay: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    loanType: {
        type: String,
        required: true
    },
    payment_made_num_months: {
        type: Number,
        required: true,
        default: 0
    },
    paymentDate: { type: Date, default: Date.now },
    paymentType: {
        type: String,
        required: true
    }
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment