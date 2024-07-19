import express from 'express'
import { body, validationResult } from "express-validator";
import Account from '../model/account';
import Customer from '../model/customer';
import Loan from '../model/loan';
import Payment from '../model/payment';
import { Schema } from 'mongoose';
import LoanStatus from '../model/loan_status';

const router = express.Router()


// fill up account
async function loan_Status(req: express.Request, res: express.Response) {
    try {
        let loanid_exist = await Loan.find({ _id: req.body.loan_id })
        console.log("loan_id_exist", loanid_exist)

        let pay_details = await Payment.find({ loan_id: loanid_exist[0]._id })
        console.log("pay_details: ", pay_details)

        let payment_remaining = loanid_exist[0]['amountToBePaid'] - pay_details[0]['amount']
        console.log("payment remaining: ", payment_remaining)

        console.log(Boolean(loanid_exist))
        if (!loanid_exist) {
            res.json({ "message": "loan id does not exist" })
        } else {
            const status = new LoanStatus({
                loan_id: req.body.loan_id,

                amountToBePaid: loanid_exist[0]['amountToBePaid'],
                interest: loanid_exist[0]['rateOfInterest'],
                loanType: loanid_exist[0]['loanType'],
                paymentType: req.body.paymentType,
                payment_remaining: payment_remaining
            })

            await status.save()
            console.log(status)
            res.status(201).json({ message: "Loan status created successfully", status: status });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send("Error creating loan status")

    }
}

router.post('/loanStatus', loan_Status)

export default router