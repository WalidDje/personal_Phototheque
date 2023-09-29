const Album = require('../models/album');

const albums = (req, res) => {
    res.render('albums', {title: 'Mes albums'});
};

const createAlbumForm =  (req, res) => {
    res.render('new-album', {
        title: 'Nouvel album',
        errors: req.flash('error')
    });
};

const createAlbum = async (req, res, err) => {
    try {
        await Album.create({
            title: req.body.albumTitle,
        })
        res.redirect('/');
    } catch (err) {
        req.flash('error', "Erreur lors de la création de l'album");
        res.redirect('/albums/create');
    }
};

module.exports = {
    albums,
    createAlbumForm,
    createAlbum,
};