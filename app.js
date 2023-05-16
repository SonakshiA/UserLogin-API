const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes')


const dbURI = 'mongodb+srv://sonakshi:1234@cluster0.jehakqd.mongodb.net/UserDB?retryWrites=true&w=majority'
mongoose.connect(dbURI).then((res) => {
    console.log('Connected to DB');
    app.listen(3000);
}).catch(err => {
    console.log(err);
})

app.use(express.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(userRoutes);
