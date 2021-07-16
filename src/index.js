const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

//Inicializaciones
const recepy = express();
require('./database');

//Ajustes
recepy.set('port', process.env.PORT || 5000);
recepy.set('views', path.join(__dirname, 'views'));
recepy.set('view engine', 'ejs');

//Middlewares
recepy.use(morgan('dev'));
recepy.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
recepy.use(multer({storage:storage}).single('image'));

//Variables globales

//Rutas
recepy.use(require('./routes/index'));

recepy.use(require('./routes'));
recepy.use(require('./routes/authentication'));
recepy.use('/recipes', require('./routes/recipes'));

//Static files
recepy.use(express.static(path.join(__dirname, 'public')));
//Iniciar el servidor
recepy.listen(recepy.get('port'), () => {
    console.log('El servidor está rodando en el puerto 5000');
});