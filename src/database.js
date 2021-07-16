const mongoose = require('mongoose'); //Con mongoose nos conectamos a MongoDB

mongoose.connect('mongodb://localhost/recepy', {
    useNewUrlParser: true
})
    .then(db => console.log('BD Mongo está conectada!'))
    .catch(err => console.error(err));