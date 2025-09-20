const mongoose = require('mongoose');

// this is used to connect database to mongodb
function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DB connected");
    })
    .catch((err)=>{
        console.log("DB connection error", err);
    });
}

module.exports = connectDB;
