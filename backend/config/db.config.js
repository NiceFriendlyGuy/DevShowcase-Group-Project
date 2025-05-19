require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connection to MongoDB Atlas: successful'))
.catch((err) => console.error('MongoDB Atlas error: ', err))

module.exports = mongoose;