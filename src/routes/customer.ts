import express from 'express'
import Customer from '../model/customer'
import { body, validationResult } from "express-validator";
import { nanoid } from "nanoid"
const router = express.Router()




// create new customer
async function createCustomer(req: express.Request, res: express.Response) {
    try {

        let id = nanoid()

        let existingCustomer = await Customer.findOne({ id: id }).exec()
        while (existingCustomer) {
            id = nanoid();
            existingCustomer = Customer.findOne({ id: id }).exec()
        }
        const customer = await Customer.create({
            id: id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await customer.save()
        console.log(customer)
        res.send("customer created successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error creating customer" })
    }
}

router.post('/register',
    [
        body("name").notEmpty().withMessage("Name is Required"),
        body("email").isEmail().withMessage("Invalid email address"),
        body("password").isLength({ min: 6 }).withMessage("Password must be of 6 characters atleast")

    ],
    createCustomer

)


// get the customer details by justentering the id





export default router
