const PORT = 8000
const express = require('express');
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017'


const app = express();
app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.post('/signup', (req, res) => {
    res.json('This is ssignup route')
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