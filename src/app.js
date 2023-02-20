const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require("connect-mongo");
const flash = require("connect-flash")
const passport = require("passport")
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const morgn = require('morgan')
const morgan = require('morgan')
const multer = require('multer')
const uuid = require('uuid')
const { format } = require('timeago.js');


//init
app = express()
require('./config/db')
require("./config/passport")

 



// settings
app.set('port', process.env.PORT || 5000) //configuracion del puerto
app.set('views', path.join(__dirname, 'views')) //indicar a node el lugar de las vistas

//configuracion del motor de vistas
//exphbs.registerHelper('dateFormat', require('handlebars-dateformat'));

const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layout"),
    partialsDir: path.join(app.get("views"), "partial"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  });
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')


//middleweares
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/img/uploades'),
  filename: (req, file, cb, filename) => {
      //console.log(file);
      cb(null, uuid.v4() + path.extname(file.originalname));
  }
}) 
app.use(multer({storage}).single('image'))
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method')) //middlewer para enviar otros methodos en los forms PUT, DELETE
app.use(session({
    secret: 'ntutumu25',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/loginuser" }),
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());


//global variables
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.locals.success_msg = req.flash("success_sms");
    res.locals.error_msg = req.flash("error_sms");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    app.locals.formats = format; 
    next();
  });
 

//routes 
app.use(require('./routes/index.router'))
app.use(require('./routes/user.router'))
app.use(require('./routes/post.router'))

//static routes
app.use(express.static(path.join(__dirname,'../public'))); //llamar archivos staticos
app.use((req, res)=>{
    res.sendFile(path.join(__dirname,'../public/404.html'))
})

//init servers

app.listen(app.get("port"), ()=>{
    console.log("Servidor en el puerto", app.get('port'))

})
