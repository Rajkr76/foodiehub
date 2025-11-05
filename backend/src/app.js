// create server

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');

const app = express();


app.use(cors({
    origin: ['http://localhost:5173','https://foodiehubproject.vercel.app'],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
// routes


app.get("/",(req, res)=>{
    res.send("server is running");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;