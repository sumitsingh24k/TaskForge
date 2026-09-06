const app=require('./app');
const dotenv=require('dotenv');
const connectDB=require('./config/db'); 
dotenv.config();  
connectDB();
app.listen(process.env.port, () => {
  console.log(`TaskForge running on ${process.env.port}`);
});