import fetch from "node-fetch";
import passport from 'passport';
import Dir from "../routes/api-local.js";
import axios from "axios";



export const slash = async (req, res) => {
  const response = "";
  res.render("index.ejs", { response });
};

export const renderlogin = async (req, res) => {
  res.render("Login.ejs");
};

export const renderHome = async (req, res) => {
  res.render("index.ejs");
};

export const renderPerfil = async (req, res) => {
  try {
    const response = await fetch(`${Dir}/api/user/${req.user.usser}`);
    const data = await response.json();
    const usuario = req.user.usser;
    const nombre = req.user.nombre;
    const contrasena = req.user.contrasena;
    const correo = req.user.correo;
    const telefono = req.user.telefono;
    res.render("perfil.ejs", { data, usuario, nombre, contrasena, correo, telefono });
  } catch (error) {
    console.error("Error al obtener los datos del perfil:", error);
    res.status(500).send("Error interno del servidor");
  }
};


export const renderPartidas = async (req, res) => {
  const response = await fetch(Dir+"/api/Partidas/"+req.user.usser)
  const data = await response.json();  
  const cartas = data
  const nombre = req.user.usser
  var paginas = Math.floor((cartas / 3) + 1)
  res.render("partidas.ejs", { cartas, paginas, nombre });
};

export const crearPartida = async (req, res) => {
  res.render("crearPartida.ejs");
};

export const crearPartidaForm = async (req, res) => {
  console.log(req.body)
  const response = await fetch(Dir+"/api/partida/"+req.user.usser+"", {
    method: "post",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" },
  });
  const resp = await response.json()
  const responsee = await fetch(Dir+"/api/invitados/"+resp+"")
  const data = await responsee.json();
  const invitados = data
  const partida = resp
  res.render("invitar.ejs", { invitados,partida })
};

export const Invitar = async (req, res) => {  
  console.log(req.body)
  const response = await fetch(Dir+"/api/invitar", {
    method: "post",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" },
  });
  const responsee = await fetch(Dir+"/api/invitados/"+req.body.partidaid+"")
  const data = await responsee.json();
  const invitados = data
  const partida = req.body.partidaid
  res.render("invitar.ejs", { invitados,partida })
};

export const renderInvitar = async (req, res) => {
  var partida = ''
  if(req.query != ''){
    partida = req.query.idPartida
    console.log(partida)
  }else{
    partida = req.body.partidaid
  }
  const response = await fetch(Dir+"/api/invitados/"+partida+"")
  const data = await response.json();
  const invitados = data
  res.render("invitar.ejs", { invitados,partida });

};

export const SendData = passport.authenticate('local.login', {  
  successRedirect: '/partidas', //perfil
  failureRedirect: '/login',
  failureFlash: true
});

/* export const SendData = async (req, res) => {  
  console.log(req.body)
  const response = await fetch(Dir+"/api/post", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(req.body) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects


}; */



export const register = async (req, res) => {
  try {
    const response = await fetch(Dir+"/api/register", {
      method: 'post',
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });
    const resp = await response.json()
    if (response.status == 200)
      res.render("Login.ejs");
    else
      res.render('index.ejs')
  } catch (error) {
    res.send(error)
  }
};

export const cerrarSesion = async (req, res) => {  
  req.logOut(async (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
