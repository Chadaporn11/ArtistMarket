const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log('Connect DB Success...');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

}

module.exports = connectDB;