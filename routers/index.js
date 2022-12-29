import { Router } from 'express';
import carrito from './carrito.js';
import productos from './producto.js';
import login from './login/login.js';
import registro from './login/registro.js';


const router = Router();
router.use('/api/carrito', carrito);
router.use('/api/productos', productos);
router.use('/', login, registro);
export default router;