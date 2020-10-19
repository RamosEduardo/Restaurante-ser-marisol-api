const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://cleiton:091647Cleitonedu@cluster0.llu0r.mongodb.net/rsm?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);