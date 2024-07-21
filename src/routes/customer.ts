import express from 'express'
import Customer from '../model/customer'
import { body, validationResult } from "express-validator";
import { nanoid } from "nanoid"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = express.Router()

const JWT_SECRET = "secret"



// create new customer
async function createCustomer(req: express.Request, res: express.Response) {

    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    try {
        let customer = await Customer.findOne({ email: req.body.email })

        if (customer) {
            return res.status(400).json({
                success, error: "sorry a user with this email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hashSync(req.body.password, salt)

        customer = await Customer.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            customer: {
                id: customer._id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true

        await customer.save()
        console.log(customer)
        res.json({ success, authtoken })
        res.json(customer)
        res.send("customer created successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error creating customer" })
    }
}


// registering 
router.post('/register',
    [
        body("name").notEmpty().withMessage("Name is Required"),
        body("email").isEmail().withMessage("Invalid email address"),
        body("password").isLength({ min: 6 }).withMessage("Password must be of 6 characters atleast")

    ],
    createCustomer

)


// login 

router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),

        body("password", "Enter password of minimum length 5").exists({ min: 6 }),
    ],
    async (req, res) => {
        let success = false;
        // finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req.body);

        const { email, password } = req.body;

        try {
            // if (
            //   email === config.defaultEmail &&
            //   password === config.defaultPassword
            // ) {
            let customer = await Customer.findOne({ email });
            // console.log({ user });
            if (!customer) {
                success = false;
                return res
                    .status(400)
                    .json({ success, error: "Please login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res
                    .status(400)
                    .json({ error: "Please login with correct credentials" });
            }
            const data = {
                customer: {
                    id: customer._id,
                },
            };

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;

            res.json({ success, authtoken });
            // }
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal error occurred");
        }
    }
);





export default router
