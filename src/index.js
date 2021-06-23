const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

//INITIALIZATIONS
const app = express();
require('./lib/passport');

//SETTINGS
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayault: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(session({
    secret: 'estebanmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//GLOBAL VARIABLES
app.use((req, res, next) =>{
    app.locals.user = req.user;
    next()
});

//ROUTES
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/recipes', require('./routes/recipes'));


//PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

//STARTING THE SERVER
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});