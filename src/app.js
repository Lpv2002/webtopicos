import express from "express"
import { dirname,join } from "path";
import Inicio from "./routes/inicio.js";
import morgan from "morgan";
import {fileURLToPath} from 'url';
import passport from 'passport';
import session from 'express-session';
import './lib/passport.js'



const app = express()

app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: false
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const __dirname = dirname(fileURLToPath(import.meta.url))
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(join(__dirname, 'public')))

app.use( async (req, res, next) => {    
    if (req.user) {       
                
    } else {// si no hay mandamos la variable vacia
        app.locals.user = req.user;
    }    
    next();
});

app.use(Inicio)



export default app;