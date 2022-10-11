const PORT = 8000
const express = require('express');
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017'
const { v1: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors')
app.use(express.json())


app.use(cors({
    origin: true,
    credentials: true,
}));

app.get('/', (req, res) => {
    res.json('Hello to my app')
})


app.post('/signup', async (req, res) => {

    const client = new MongoClient(uri)

    const { email, password } = req.body

    const generateUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)


    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const existingUser = await users.findOne({ email })
        if (existingUser) { return res.status(409).send('user already exists. Please login') }


        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generateUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword

        }

        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })

        res.status(201).json({ token, user_id: generateUserId, email: sanitizedEmail })
    }
    catch (error) { console.log(error) }
})

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body;
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({ email })

        const correctPasword = await bcrypt.compare(password, user.hashed_password)
        if (user && correctPasword) {
            const token = jwt.sign(user, email,
                {
                    expiresIn: 60 * 24
                })
            res.status(201).json({ token, userId: user.user_id, email })
        }
        res.status(400).send('invalid credentials')
    }
    catch (err) { console.log(err) }

})


app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const returnedUsers = await users.find({}).toArray()
        res.send(returnedUsers)
    }
    finally {
        await client.close()
    }
})
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
// async function main() {
//     console.log('trying to connect');
//     await mongoose.connect(
//         'mongodb://localhost:27017/app-data',
//         {
//             useNewUrlParser: true,
//             // useCreateIndex: true,
//             // useFindAndModify: false,
//         },
//     );

//     app.listen(PORT, () => {
//         console.log(`Example app listening on port ${PORT}`);
//     });
// }
// main()
