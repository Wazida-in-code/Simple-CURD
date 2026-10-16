import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb';
import 'dotenv/config'


const app = express();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0jmuayl.mongodb.net/`);

export async function connectToMongoDB() {
    try {
        await client.connect()
        console.log('Successfully connected to Mongodb');
        return client
    }
    catch(err){
        console.dir(err);
    }
}

const connectedClient = await connectToMongoDB()
const db = connectedClient.db('SimpleCurdDB')
const users = db.collection('users')


app.get('/users', async(req, res) => {
    const cursor = users.find({});
    const allUsers = await cursor.toArray();
    res.send(allUsers)
})


app.post('/users', async(req, res) => {
    const newUser = req.body
    const result = await users.insertOne(newUser)
    res.send(result)
})

app.get('/', (req, res) => {
    res.send("CURD is started...")
})

app.listen(port, () => {
    console.log(`Simple CURD is running in port ${port}`);
})