const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recepy', {
    useNewUrlParser: true
})
    .then(db => console.log('BD Mongo está conectada!'))
    .catch(err => console.error(err));