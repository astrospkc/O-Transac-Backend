import express from 'express'
import { body, validationResult } from "express-validator";
import Account from '../model/account';

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

        const account = await Account.create({
            accountNumber: accountNo,
            accountType: req.body.accountType,
            balance: req.body.balance
        })
        await account.save()
        console.log(account)
        res.send("customer created successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error creating customer" })
    }
}

router.post('/account',
    [
        body("accountType").notEmpty().withMessage("Account type is required"),
        body("balance").notEmpty().withMessage("balance is required"),


    ],
    bankAccount

)



export default router
