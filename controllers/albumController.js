const Album = require('../models/album');
const path = require('path');
const fs = require('fs');

const albums = async (req, res) => {
    const albums = await Album.find();
    res.render('albums', {
        title: 'Mes albums',
        albums: albums,
    });
};

const album = async (req, res) => {
    try {
        const idAlbum = req.params.id;
        const album = await Album.findById(idAlbum);
        res.render('album', {
            title: 'Album',
            album: album,
        })
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }
};

const addImage = async (req, res) => {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);

    const imageName = req.files.image.name;
    const folderPath = path.join(__dirname, '../public/uploads', idAlbum);
    fs.mkdirSync(folderPath, { recursive: true });

    const localPath = path.join(folderPath, imageName);
    await req.files.image.mv(localPath);

    album.images.push(imageName);
    await album.save();

    res.redirect(`/albums/${idAlbum}`);
};

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
        title: 'New album',
        errors: req.flash('error'),
    });
};

const createAlbum = async (res, req) => {
    try {
        if (!req.body.albumTitle) {
            req.flash('error', 'Le titre ne doit pas être vide');
            res.redirect('/albums/create');
            return;
        }
        await Album.create({
            title: req.body.albumTitle,
        })
        res.redirect('/albums');
    } catch (err) {
        req.flash('error', 'Erreur lors de la création de l\'album');
        res.redirect('/albums/create');
    }
};

module.exports = {
    albums,
    createAlbumForm,
    createAlbum,
};