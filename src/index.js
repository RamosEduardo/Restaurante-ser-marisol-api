const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://rsm2020:2020dadosrsm@bancositersm.8jjsw.mongodb.net/rsm?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333
console.log('> ', port )

app.listen(port);
