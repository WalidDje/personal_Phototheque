const Album = require('../models/album');

const createAlbumForm =  (req, res) => {
    res.render('new-album', { title: 'New album' });
};

const createAlbum = async (res, req) => {
    await Album.create({
        title: req.body.albumTitle,
    })
    res.redirect('/');
};

module.exports = {
    createAlbumForm,
    createAlbum,
};