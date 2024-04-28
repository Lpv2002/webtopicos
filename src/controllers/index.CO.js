import fetch from "node-fetch";
import passport from 'passport';
import Dir from "../routes/api-local.js";



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
  var paginas = Math.floor((cartas / 3) + 1)
  res.render("partidas.ejs", { cartas, paginas, nombre:req.user.usser });
};

export const crearPartida = async (req, res) => {
  res.render("crearPartida.ejs");
};

export const crearPartidaForm = async (req, res) => {
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
  if(req.query != ''){
    const partida = req.query.idPartida
  }else{
    const partida = req.body.partidaid
  }
  const partida = req.body.partida
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




export const register = async (req, res) => {
  try {
    const response = await fetch(Dir+"/api/register", {
      method: 'post',
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });
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
