const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const albumRoutes = require('./routes/albumRoutes');

const app = express();

mongoose.connect('mongodb://localhost/phototheque');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('album', { title: 'Album' });
});

app.use('/', albumRoutes);

app.use((req, res) => {
    res.status(404);
    res.send('Page non trouvée');
});

app.listen(3000, () => {
    console.log('Application lancée sur le port 3000!');
});