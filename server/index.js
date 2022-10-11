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

        res.status(201).json({ token, user_id: generateUserId })
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
            res.status(201).json({ token, user_id: user.user_id })

        }
        res.status(400).send('invalid credentials')
    }
    catch (err) { console.log(err) }

})


// app.get('/users', async (req, res) => {
//     const client = new MongoClient(uri)
//     try {
//         await client.connect()
//         const database = client.db('app-data')
//         const users = database.collection('users')
//         const returnedUsers = await users.find({}).toArray()
//         res.send(returnedUsers)
//     }
//     finally {
//         await client.close()
//     }
// })


app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: formData.user_id }
        const updateDocument = {
            $set: {

                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,

                url: formData.url,
                about: formData.about,
                matсhes: formData.matсhes,
            }
        }
        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)
    } finally {
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
