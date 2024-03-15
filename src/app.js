import express from "express"
import { dirname,join } from "path";
import Inicio from "./routes/inicio.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import {fileURLToPath} from 'url';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import helpers from "./lib/helpers.js";
import './lib/passport.js'



const app = express()

app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());   
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({ extended: true }))
const __dirname = dirname(fileURLToPath(import.meta.url))
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(join(__dirname, 'public')))

app.use( async (req, res, next) => {    
    app.locals.aprobado = req.flash("aprobado");
    app.locals.denegado = req.flash("denegado");
    app.locals.denegadoE = req.flash("denegadoE");

    if (req.user) {
        app.locals.VerM = helpers.VRolM(req.user.rol_id)
        app.locals.VerAS = helpers.VRolAs(req.user.rol_id)
        app.locals.VerAd = helpers.VRolAd(req.user.rol_id)
                
    } else {// si no hay mandamos la variable vacia
        app.locals.user = req.user;
    }    
    next();
});

app.use(Inicio)



export default app;