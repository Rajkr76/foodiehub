// start server
const dotenv = require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})