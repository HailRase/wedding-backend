require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Guest = require('./models/Guest');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к БД
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Роуты
app.post('/guests', async (req, res) => {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json(guest);
});

app.get('/guests', async (req, res) => {
    const guests = await Guest.find();
    res.json(guests);
});

app.delete('/guests/:id', async (req, res) => {
    await Guest.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});