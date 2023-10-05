const Album = require('../models/album');

const album = async (req, res) => {
    try {

        const idAlbum = req.params.id;
        const album = await Album.findById(idAlbum);
        
        res.render('album', {
            title: 'album',
            album: album
        });
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }
};

const albums = async (req, res) => {
    const albums = await Album.find();
    res.render('albums', {
        title: 'Mes albums',
        albums: albums
    });
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
    album,
    albums,
    createAlbumForm,
    createAlbum,
};