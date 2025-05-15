const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/portfoliodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connection to database: successful'))
.catch((err) => console.error('Database error: ', err))

module.exports = mongoose;