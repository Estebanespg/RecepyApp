//Enrutaciones
const { Router } = require('express');
const router = Router();

const Image = require('../models/Image')

router.get('/', async (req, res) => {
    const images = await Image.find();
    console.log(images);

    //res.send('Pagina de inicio');
    res.render('inicio', {images: images});
});

//Subir imagen
router.get('/upload', (req, res) => {
    console.log(req.file);
    res.render('uploads');
});
//Guardar imagen
router.post('/upload', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    
    await image.save();
    console.log(image);
    //res.send('Subida!')
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/image/:id', (req, res) => {
    res.send('Perfil de la imagen');
});

router.get('/image/:id/delete', (req, res) => {
    res.send('Imagen eliminada');
});

module.exports = router;