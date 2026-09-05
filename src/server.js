const app=require('./app');
const dotenv=require('dotenv');
dotenv.config();  
app.listen(process.env.port, () => {
  console.log(`TaskForge running on ${process.env.port}`);
});