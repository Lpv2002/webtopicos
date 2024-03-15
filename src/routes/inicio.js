import { Router } from "express" 
import { slash,renderregister,RenderLogin, SendData, cerrarSesion, home, RenderG, SendDatos, RenderL, DeleteE, Memp} from "../controllers/index.CO.js";
import { logeado, notlogeado } from "../lib/privado.js";

const Inicio = Router();

Inicio.get('/', slash)


export default Inicio;