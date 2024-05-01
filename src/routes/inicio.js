import { Router } from "express"
import { Invitar, SendData, cerrarSesion, crearPartida, crearPartidaForm, register, renderHome, renderInvitar, renderPartidas, renderPerfil, renderlogin } from "../controllers/index.CO.js"
import multer from 'multer';
import FormData from 'form-data';
import Dir from "../routes/api-local.js";
import axios from 'axios';


const Inicio = Router();

Inicio.get('/', renderHome)

Inicio.get('/login', renderlogin)

Inicio.post('/login', SendData)

Inicio.get('/cerrar', cerrarSesion)

Inicio.post('/register', register)

Inicio.get('/perfil', renderPerfil)

Inicio.get('/partidas', renderPartidas)

Inicio.get('/crearPartida', crearPartida)

Inicio.get('/invitar', renderInvitar)

Inicio.post('/invitar', Invitar)

Inicio.post('/crearPartida', crearPartidaForm)

Inicio.post('/Iniciar', Invitar)
const upload = multer({ storage: multer.memoryStorage() });
Inicio.post('/Update', upload.single('qr'),async (req, res) => {
    const form = new FormData();
    form.append('qr', req.file.buffer, { filename: req.file.originalname, contentType: req.file.mimetype });

    try {
        const response = await axios.post(Dir + "/api/subirQr/" + req.user.usser, form, {
            headers: form.getHeaders()
        });

        res.redirect("/partida")
    } catch (error) {
        console.error(error);
        res.send('Error al enviar la imagen');
    }
})


export default Inicio;