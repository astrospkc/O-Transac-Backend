import express from 'express'
import { body, validationResult } from "express-validator";
import Account from '../model/account';
import Customer from '../model/customer';
import Loan from '../model/loan';
import Payment from '../model/payment';

const router = express.Router()


// fill up account
async function payLoan(req: express.Request, res: express.Response) {
    try {

        let existing_loan = await Loan.find({ _id: req.body.loan_id });
        let loan_type = await Loan.find({ loanType: req.body.loanType })
        console.log("existing_loan ", existing_loan)

        let get_loan_type = existing_loan[0]['loanType']
        let amount = req.body.amount;
        console.log("amount: ", amount)
        let principle_amount = 0;
        let paymentMadeForNumMonths = req.body.payment_made_num_months;
        console.log("payment made for months: ", paymentMadeForNumMonths)

        let totalAmountToPay = existing_loan[0]['amountToBePaid'];
        if (amount == 0) {
            principle_amount = existing_loan[0]['principleAmount']
            console.log("principle amount: ", principle_amount)

        } else {
            principle_amount = principle_amount - amount;
            console.log("principle amount: ", principle_amount)
            totalAmountToPay = principle_amount + existing_loan[0]['monthly_interest'] * (existing_loan[0]['duration'] - paymentMadeForNumMonths)
            console.log("total amount ot paid: ", totalAmountToPay)

        }

        console.log("principle_amount: ", principle_amount, "total amount to pay: ", totalAmountToPay)


        // console.log("existing loan and loanType", existing_loan, loan_types)
        if (!existing_loan) {
            return res.status(404).json({ message: "There is not loan taken with this loan_id" });
        } else {

            const pay = await Payment.create({
                loan_id: req.body.loan_id,
                amount: amount,
                payment_made_num_months: paymentMadeForNumMonths,
                total_amount_to_pay: totalAmountToPay,
                loanType: get_loan_type,
                paymentType: req.body.paymentType
            })
            await pay.save()
            console.log(pay)
            res.json(pay)
            res.send("payment made successfully")
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error creating customer" })
    }
}

router.post('/payloan',
    [
        body("amount").notEmpty().withMessage("amount is required"),
        body("loanType").notEmpty().withMessage("loan type is required"),
        body("paymentType").notEmpty().withMessage("payment type is required"),
    ],
    payLoan

)

export default router
