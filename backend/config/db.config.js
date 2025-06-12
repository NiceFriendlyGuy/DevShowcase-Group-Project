require('dotenv').config();
const mongoose = require('mongoose');

// for local MongoDB container (obsolete)
// const dbUri = 'mongodb://portfolio_database/portfoliodb';

const dbUri =  process.env.USE_ATLAS === 'true' ? process.env.MONGO_URI : /* mongodb://localhost:27017/portfoliodb */ 'mongodb://portfolio_database/portfoliodb'

mongoose.connect(dbUri)
.then(() => {
    const source = process.env.USE_ATLAS === 'true' ? 'MongoDB Atlas' : 'MongoDB local';
    console.log(`connection to ${source}: successful`);
})
.catch((err) => console.error('MongoDB error: ', err))

module.exports = mongoose;