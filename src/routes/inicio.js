import { Router } from "express" 
import{login, register, renderHome, renderlogin} from "../controllers/index.CO.js"


const Inicio = Router();

Inicio.get('/', renderHome)

Inicio.get('/login',renderlogin)

Inicio.post('/login',login)

Inicio.post('/register',register)


export default Inicio;