import express from 'express'
import { body, validationResult } from "express-validator";
import Account from '../model/account';
import Customer from '../model/customer';

const router = express.Router()


// fill up account
async function bankAccount(req: express.Request, res: express.Response) {
    try {


        let accountNo = Math.floor(Math.random() * 10000000000000000);
        accountNo.toString();
        let existingAccNum = await Account.findOne({ accountNumber: accountNo })
        while (existingAccNum) {
            accountNo = Math.floor(Math.random() * 10000000000000000);
            accountNo.toString();
            existingAccNum = Account.findOne({ accountNumber: accountNo })
        }


        // check if customer is registered or not
        let existing_customer = await Customer.findOne({ _id: req.body.customer_id });
        if (!existing_customer) {
            return res.status(404).json({ message: "Kindly register first" });
        } else {
            let existing_account_holder = await Account.findOne({ customer_id: req.body.customer_id });
            if (!existing_account_holder) {
                const account = await Account.create({
                    customer_id: req.body.customer_id,
                    accountNumber: accountNo,
                    accountType: req.body.accountType,
                    balance: req.body.balance
                })
                await account.save()
                console.log(account)
                res.json(account)
                res.send("account  created successfully")
            } else {
                res.json(existing_account_holder)
                return res.status(404).json({ message: "Account already exists" })
            }

        }


    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error creating customer" })
    }
}

router.post('/create',
    [
        body("accountType").notEmpty().withMessage("Account type is required"),
        body("balance").notEmpty().withMessage("balance is required"),


    ],
    bankAccount

)

// fetching accounts detail

async function getAccountDetails(req: express.Request, res: express.Response) {
    try {
        const accounts = await Account.find({ accountNumber: req.params.accountNumber });
        res.json({ data: accounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving account details" });
    }
}

router.get("/account_information/:accountNumber", getAccountDetails);



export default router
