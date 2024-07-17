import express, { application } from 'express';

import connectToMongo from "./db"
import customerRouter from "./routes/customer"
import accountRouter from "./routes/account"
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors())
const port = 4000
connectToMongo()




app.get('/', (req: express.Request, res: express.Response) => {
    // Your route logic here
    res.send('hello woorks')
    console.log("hello world")
});

app.use('/api/customer', accountRouter)

app.use('/api/customer', customerRouter) // user connected


app.listen(port, () => {
    console.log(`server started on port http://localhost:${port}`);
});