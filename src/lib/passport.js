import passport from 'passport';
import Strategy from 'passport-local';
import fetch from "node-fetch";
import Dir from '../routes/api-local.js';


//para iniciar sesion
passport.use('local.login', new Strategy.Strategy({
    usernameField: 'usser',
    passwordField: 'contrasena',
    passReqToCallback: true
}, async (req, usser, contrasena, done) => {
    try {
        const response = await fetch("http://" + Dir + "/api/login", {
            method: "POST",
            mode: 'same-origin', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            body: JSON.stringify(req.body),
            headers: { "Content-Type": "application/json" },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
        });
        const resp = await response.json()
        return done(null, resp[0])
    } catch (e) {
        console.log(e)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.usser);// mando los datos a las variables globales
});

passport.deserializeUser(async (user, done) => {
    try {
        const response = await fetch("http://" + Dir + "/api/user/" + user + "", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const resp = await response.json()
        done(null, resp); // mando los datos a las variables globales
    } catch (e) {
        console.log(e)
    }
});