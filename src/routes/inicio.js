import { Router } from "express" 
import{Invitar, SendData, cerrarSesion, crearPartida, crearPartidaForm,  register, renderHome, renderInvitar, renderPartidas, renderlogin} from "../controllers/index.CO.js"


const Inicio = Router();

Inicio.get('/', renderHome)

Inicio.get('/login',renderlogin)

Inicio.post('/login',SendData)

Inicio.get('/cerrar', cerrarSesion);

Inicio.post('/register',register)

Inicio.get('/partidas',renderPartidas)

Inicio.get('/crearPartida',crearPartida)

Inicio.get('/invitar',renderInvitar)

Inicio.post('/invitar',Invitar)

Inicio.post('/crearPartida',crearPartidaForm)


export default Inicio;