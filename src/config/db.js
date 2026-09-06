const mongoose= require('mongoose')

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.mongoURI)
        console.log('MongoDB connected successfully')

    }
    catch(error){
        console.log("MongoDB Connection Failed:", error.message);
    }
}
module.exports = connectDB