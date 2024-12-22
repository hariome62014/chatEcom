// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const userRoutes = require("./routes/User");



const database = require("./config/Database");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(express.json());

app.use(cookieParser());


const dotenv = require("dotenv");
dotenv.config();


database.connect();

app.post('/api/chat', async (req, res) => {
    try {
        const { query } = req.body;
        const response = await axios.post('http://localhost:5000/api/chat', { query });
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error communicating with the chatbot API");
    }
});

console.log("reached UserRoutes passage")
app.use("/api/v1/auth", userRoutes);
console.log("leaving UserRoutes passage")


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
