import express from 'express';
import Customer from '../model/customer';
import { body, validationResult } from "express-validator";
import { nanoid } from "nanoid";
import Loan from "../model/loan"
import Account from '../model/account';
const router = express.Router();

function interest(loanType: string): number | undefined {
    const interestRates: { [key: string]: number } = {
        "Personal Loan": 10,
        "Home Loan": 5,
        "Educational Loan": 5,
        "Business Loan": 8
    };

    return interestRates[loanType];
}

function calculatedAmount(rate_of_interest: number, principle_amount: number, years: number): number {
    return principle_amount + (rate_of_interest * principle_amount * years) / 100;
}

// Apply for loan
async function loanApply(req: express.Request, res: express.Response) {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // destructuring the request body
        let { accountNumber, principleAmount, loanType, duration } = req.body;
        console.log("account number: ", accountNumber)

        // check if the account exists or not
        let existing_customer_acc = await Account.findOne({ accountNumber: accountNumber });
        console.log("existing customer account", existing_customer_acc)

        // Calculate rate of interest and amount to be paid
        const rateOfInterest = interest(loanType);
        console.log("rate_of_interest", rateOfInterest)

        if (rateOfInterest === undefined) {
            return res.status(400).json({ message: "Invalid loan type" });
        }


        // how much amount to be paid after interest
        const amountToBePaid = calculatedAmount(rateOfInterest, principleAmount, duration);
        console.log("amount to be paid", amountToBePaid)
        const emiPerMonth = amountToBePaid / 12;

        // Create a new loan



        // check if the  account exist or not , if account found then apply for loan
        if (!existing_customer_acc) {
            return res.status(404).json({ message: "Customer account not found" });
        } else {
            const loan = new Loan({
                accountNumber: accountNumber,
                principleAmount,

                loanType,
                rateOfInterest,
                duration,
                amountToBePaid,
                emi_per_month: emiPerMonth,
                monthly_interest: rateOfInterest / 12
            });
            await loan.save();
            console.log(loan);

            res.json({ message: "loan applied successfully", loan: loan })
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error creating loan" });
    }
}

// Route for applying for a loan
router.post('/apply',
    body('principleAmount').isNumeric().withMessage('Principle amount must be a number'),
    body('loanType').isString().withMessage('Loan type must be a string'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
    loanApply
);


// payloan




export default router;
