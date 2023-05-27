const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')

const studentRouter = require('./routes/student')
const mentorRouter = require('./routes/mentor')

const app = express()
dotEnv.config()

app.use(bodyParser.json())

app.use('/student', studentRouter)
app.use('/mentor', mentorRouter)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.status || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(process.env.MONGOOSE_URL)
    .then(res => {
        app.listen(process.env.PORT, () => console.log("App is Listening"))
    })
    .catch(err => console.log(err));