const Album = require('../models/album');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const album = async (req, res) => {
    try {

        const idAlbum = req.params.id;
        const album = await Album.findById(idAlbum);
        
        res.render('album', {
            title: `Mon album ${album.title}`,
            album: album,
            errors: req.flash('error')
        });
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }
};

const addImage = async (res, req) => {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);

    if (!req?.files?.image) {
        req.flash('error', 'Aucun fichier mis en ligne');
        res.redirect(`/albums/${idAlbum}`);
        return;
    }

    const image = req.files.image;
    if (image.mimetype != 'image/jpeg' && image.mimetype != 'image/png') {
        req.flash('error', 'Fichiers JPEG et PNG acceptés uniquement !');
        res.redirect(`/albums/${idAlbum}`);
        return;
    }

    
    const folderPath = path.join(__dirname, "../public.uploads", idAlbum);
    fs.mkdirSync(folderPath, { recursive: true });
    
    const imageName = image.name;
    const localPath = path.join(folderPath, imageName);
    await req.files.image.mv(localPath);

    album.images.push(imageName);
    await album.save();

    res.redirect(`/albums/${idAlbum}`);
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

const deleteImage = async (req, res) => {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);

    const imageIndex = req.params.imageIndex;
    const image = album.images[imageIndex];
    if (!image) {
        res.redirect(`/albums/${idAlbum}`);
        return;
    }

    album.images.splice(imageIndex, 1);
    await album.save();

    const imagePath = path.join(__dirname, '../public/uploads', idAlbum, image);
    fs.unlinkSync(imagePath);

    res.redirect(`/albums/${idAlbum}`);
};

const deleteAlbum = async (req, res) => {
    const idAlbum = req.params.id;
    await Album.findByIdAndDelete(idAlbum);

    const albumPath = path.join(__dirname, '../public/uploads', idAlbum);
    rimraf(albumPath, () => {
        res.redirect('/albums');
    });
}


module.exports = {
    album,
    albums,
    addImage,
    createAlbumForm,
    createAlbum,
    deleteImage,
    deleteAlbum
};