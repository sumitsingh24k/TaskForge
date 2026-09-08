const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        // DB ke bina server chalane ka koi matlab nahi
        process.exit(1);
    }
};

module.exports = connectDB;
