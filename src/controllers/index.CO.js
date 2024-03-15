import passport from 'passport';
import helpers from '../lib/helpers.js';
import fetch from "node-fetch";

export const slash = async(req, res) =>  {
  const response=""
  res.render('index.ejs',{response});
};




export const Renderde = async(req, res) => {
  const depre = await fetch(`https://apisi2.up.railway.app/api/actiDep/${req.query.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const Activo = await fetch(`https://apisi2.up.railway.app/api/acti/${req.query.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const ubi = await fetch(`https://apisi2.up.railway.app/api/Gactivo/${req.query.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const mant = await fetch(`https://apisi2.up.railway.app/api/GM/${req.query.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const garantia = await fetch(`https://apisi2.up.railway.app/api/Gacti/${req.query.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  var total = 0
  for (const objeto of mant) {
    total = total + objeto.costo 
  }
  var data = []
  var datos = []
  const id = req.query.id
  if(depre.length > 0){
  const fecha = depre[0].fecha.substring(0,10)
  var Naño = parseInt(fecha.slice(0, -6))
  const Vutil = parseInt(depre[0].vida_util)
  const Cdepreciable = parseInt(depre[0].costo_dep)
  const VRescate = parseInt(depre[0].valor_res)
  var d = Math.floor((Cdepreciable - VRescate) / Vutil)

  const Total = Math.floor(depre[0].costo_dep)
  datos = [{ fecha: fecha, costoD: Cdepreciable, Vres: VRescate, VidaU: Vutil, metodo: "Linea Recta" }]
  for (var i = 1; i <= Vutil; i++) {
    const dato = { year: Naño, value: Total - (d * i), depre: d, depreacu: (d * i), tota: Total }
    Naño++
    data.unshift(dato)
  }
  }else{    
  }
  
  res.render('depre.ejs', { datos, data, Activo, garantia,id,ubi,total,mant });
};

export const deprecalculo = async(req, res) => {
  const depre = await fetch(`https://apisi2.up.railway.app/api/actiDep/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const Activo = await fetch(`https://apisi2.up.railway.app/api/acti/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const ubi = await fetch(`https://apisi2.up.railway.app/api/Gactivo/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const mant = await fetch(`https://apisi2.up.railway.app/api/GM/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const garantia = await fetch(`https://apisi2.up.railway.app/api/Gacti/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  var total = 0
  for (const objeto of mant) {
    total = total + objeto.costo 
  }
  const id = req.body.id
  let data = []
  const fecha = req.body.fecha
  var Naño = parseInt(fecha.slice(0, -6))
  var Nmes = parseInt(fecha.slice(5, -3))
  const Vutil = parseInt(req.body.Vutil)
  const Cdepreciable = parseInt(req.body.Cdepreciable)
  const VRescate = parseInt(req.body.VRescate)
  var d = Math.floor((Cdepreciable - VRescate) / Vutil)
  const Total = Math.floor(req.body.Cdepreciable)
  const datos = [{ fecha: fecha, costoD: Cdepreciable, Vres: VRescate, VidaU: Vutil, metodo: "Linea Recta" }]
  for (var i = 1; i <= Vutil; i++) {
    const dato = { year: Naño, value: Total - (d * i), depre: d, depreacu: (d * i), tota: Total }
    Naño++
    data.unshift(dato)
  }
  const costo_dep = req.body.Cdepreciable
  const valor_res = req.body.VRescate
  const vida_util = req.body.Vutil
  const response = await fetch('https://apisi2.up.railway.app/api/acti/depre', {
    method: 'post',
    body: JSON.stringify({ id, costo_dep,valor_res,vida_util,fecha }),
    headers: { 'Content-Type': 'application/json' }
  });

  res.render('depre.ejs', {datos, data, Activo, garantia,id,ubi,total,mant});
};

export const revalor = async(req, res) => {
  const depre = await fetch(`https://apisi2.up.railway.app/api/actiDep/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const Activo = await fetch(`https://apisi2.up.railway.app/api/acti/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const ubi = await fetch(`https://apisi2.up.railway.app/api/Gactivo/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const mant = await fetch(`https://apisi2.up.railway.app/api/GM/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  const garantia = await fetch(`https://apisi2.up.railway.app/api/Gacti/${req.body.id}`,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  });
  var total = 0
  for (const objeto of mant) {
    total = total + objeto.costo 
  }
  const id = req.body.id
  var valor_ras = parseInt(req.body.valor_ras)
  const Vutil = parseInt(depre[0].vida_util)
  var Cdepreciable = parseInt(depre[0].costo_dep)
  const VRescate = parseInt(depre[0].valor_res)
  var d = Math.floor((Cdepreciable - VRescate) / Vutil)
  const valorenlibro = Cdepreciable - d
  var cal = valorenlibro - valor_ras
  if(cal < 0 ){
    cal = cal * (-1)
  }
  console.log("incremento por revaluacion= " + cal)
  if(valor_ras > valorenlibro){
    Cdepreciable = Cdepreciable + cal
  }else{    
    Cdepreciable = Cdepreciable - cal
  }
  var d = Math.floor((Cdepreciable - VRescate) / Vutil)
  valor_ras = cal
  const respons = await fetch('https://apisi2.up.railway.app/api/acti/rev', {
    method: 'post',
    body: JSON.stringify({ id,valor_ras, Cdepreciable }),
    headers: { 'Content-Type': 'application/json' }
  });
  let data = []
  const fecha = depre[0].fecha
  var Naño = parseInt(fecha.slice(0, -6))  
  const Total = Math.floor(Cdepreciable)
  const datos = [{ fecha: fecha, costoD: Cdepreciable, Vres: VRescate, VidaU: Vutil, metodo: "Linea Recta" }]
  for (var i = 1; i <= Vutil; i++) {
    const dato = { year: Naño, value: Total - (d * i), depre: d, depreacu: (d * i), tota: Total }
    Naño++
    data.unshift(dato)
  }

  res.render('depre.ejs', {datos, data, Activo, garantia,id,ubi,total,mant});
};


export const reporte = async (req, res) => {
  const culpable = req.user.ci
  const response = await fetch(`https://apisi2.up.railway.app/api/acti`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  })
  res.render('reportes.ejs', { response });
};

export const reporteMant = async (req, res) => {
  const culpable = req.user.ci
  const response = await fetch(`https://apisi2.up.railway.app/api/mant`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin

    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  })
  res.render('reporteMant.ejs', { response });
};


export const renderBit = async (req, res) => {
  const response = await fetch(`https://apisi2.up.railway.app/api/bitac`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin            
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  })
  res.render('bitacora.ejs', { response });
};

export const renderBitF = async (req, res) => {
  const Inicio = req.body.Inicio
  const Fin = req.body.Fin
  const response = ""
  try {
    const response = await fetch(`https://apisi2.up.railway.app/api/bitac/${Inicio}/${Fin}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
    }).then((respueta) => {
      return respueta.json()
    })

    res.render('bitacora.ejs', { response });
  } catch (error) {
    res.render('bitacora.ejs', { response });
  }

};

export const RenderL = async (req, res) => {
  const response = await fetch(`https://apisi2.up.railway.app/api/emp`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  })
  res.render('listadoE.ejs', { response });
};

export const RenderC = async (req, res) => {
  res.render('CContra.ejs');
};

export const cambiarC = async (req, res) => {
  if (await helpers.descriptar(req.body.Apass, req.user.contrasena)) {
    const Npass = await helpers.encriptar(req.body.Npass)
    await fetch(`https://apisi2.up.railway.app/api/user/${req.user.ci}/${req.user.usuario}`, {
      method: 'put',
      body: JSON.stringify({ Npass }),
      headers: { 'Content-Type': 'application/json' },
    });
    res.redirect('/home');
  } else {
    console.log('denego')
  }
  const denegadoE = 'Contraseña Incorrecta Intente Nuevamente'
  res.render('CContra.ejs', { denegadoE });
};

export const DeleteE = async (req, res) => {
  const response = await fetch(`https://apisi2.up.railway.app/api/user/${req.body.id}`, {
    method: 'delete'
  });
  const mensaje = "Se Elimino El empleado con id: " + req.body.id
  const culpable = req.user.ci
  const respons = await fetch('https://apisi2.up.railway.app/bita/A', {
    method: 'post',
    body: JSON.stringify({ mensaje, culpable }),
    headers: { 'Content-Type': 'application/json' }
  });
  res.redirect('/listE')
};

export const Memp = async (req, res) => {
  const ubicaciones = await fetch(`https://apisi2.up.railway.app/api/ubi`, {
    method: 'get', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((respueta) => {
    return respueta.json()
  })

  const { ci, nombre, id, celular, email, ciudad, departamento, direccion, descripcion } = req.body
  res.render('empleM.ejs', { ci, nombre, id, celular, email, ciudad, departamento, direccion, descripcion, ubicaciones })
};

export const ModE = async (req, res) => {
  const { ci, nombre, id, celular, email, departamento, direccion, descripcion } = req.body;
  await fetch(`https://apisi2.up.railway.app/api/emp/${req.body.ciAnt}`, {
    method: 'put',
    body: JSON.stringify({ ci, nombre, id, celular, email, departamento, direccion, descripcion}),
    headers: { 'Content-Type': 'application/json' },
  });

  const mensaje = "Se Modifico el Empleado: " + nombre 
  const culpable = req.user.ci
  const response = await fetch('https://apisi2.up.railway.app/bita/A', {
    method: 'post',
    body: JSON.stringify({ mensaje, culpable }),
    headers: { 'Content-Type': 'application/json' }
  });

  res.redirect('/formEm')
};

export const RenderG = (req, res) => {
  res.render('gestionarA.ejs');
};

export const home = async(req, res) => {
  const response = await fetch('https://apisi2.up.railway.app/api/acti');
  const data = await response.json();
  const respons = await fetch('https://apisi2.up.railway.app/api/actiCM');
  const dataa = await respons.json();
  const Erepa = dataa.cantidad_resultados
  var cant = 0
  var total = 0
  var totalf = 0
  var y = new Date().getFullYear();
for (const objeto of data) {
  if(objeto.diacompra.substring(0,4) == y){
    totalf = totalf + objeto.costo
  }
  total = total + objeto.costo
  cant++  
}
  const usuario = req.user.nombre
  res.render('home.ejs', { usuario,cant,total,totalf,Erepa });
};

export const renderregister = async (req, res) => {
  try {
    const { nombre, email, ci, UsuI, pass } = req.body;
    const Npass = await helpers.encriptar(pass)
    const response = await fetch('https://apisi2.up.railway.app/api/createuser', {
      method: 'post',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      body: JSON.stringify({ nombre, email, ci, UsuI, Npass }),
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer'
    });
    res.redirect('/Login')
  } catch (error) {
    console.error(error);
    res.send('ERROR');
  }
}

export const RenderLogin = (req, res) => {
  res.render('Login.ejs')
}

export const SendDatos = (req, res) => {
  const Respuesta = req.body
  console.log(Respuesta)
  res.redirect('/home')
}

export const SendData = passport.authenticate('local.login', {
  successRedirect: '/home', //perfil
  failureRedirect: '/Login',
  failureFlash: true
});

export const cerrarSesion = async (req, res) => {
  const culpable = req.user.ci
  const response = await fetch(`https://apisi2.up.railway.app/api/C`, {
    method: 'post',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    body: JSON.stringify({ culpable }),
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
  });
  req.logOut(async (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

export const Renderbackup = async(req, res) => {
  const ci = req.user.ci
  const respons = await fetch(`http://localhost:5000/backupV/${req.user.ci}`);
  const response = await respons.json();
  console.log(response)
  res.render('BackUp.ejs', {response,ci});
};

export const RealizarB  = async(req, res) => {
  const ci = req.user.ci
  const response = await fetch(`http://localhost:5000/backup/${req.user.ci}`);
  res.redirect('/home');
};

export const restore  = async(req, res) => {
  const response = await fetch(`http://localhost:5000/restore/${req.body.id}`);
  res.redirect('/home');
};
