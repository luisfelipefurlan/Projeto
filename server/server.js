const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const ingredients = require('./json/Ingredients');
const menu = require('./json/SnackMenu');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/ingredients', (req, res) => {
    res.send({ ingredients });
});

app.get('/api/menu', (req, res) => {
    res.send({ menu });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
