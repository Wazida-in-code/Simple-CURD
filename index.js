import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb';
import 'dotenv/config'


const app = express();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0jmuayl.mongodb.net/`);

app.get('/', (req, res) => {
    res.send("CURD is started...")
})

app.listen(port, () => {
    console.log(`Simple CURD is running in port ${port}`);
})