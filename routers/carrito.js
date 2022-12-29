import { Router } from "express";
import twilio from "twilio";
import { carritosDao } from "./../daos/index.js";
import logger from "../logger.js";
//UTILIZAR MODO ASINCRONICO PARA LA CREACION DE LOS ARCHIVOS DE ESTA MANERA PODEMOS MANEJAR MEJOR LOS ERRORES
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const router = Router(Router);
 




router.post("/:id/productos", async (req, res) => {
  const data = req.body;
  const idCart = req.params.id;
  const carrito = await carritosDao.createById(idCart, data);
  res.status(201).json(carrito);
});

router.delete("/:id", async (req, res) => {
  const idCart = req.params.id;
  const borrarId = await carritosDao.deleteById(idCart);
  res.status(201).json(borrarId);
});

// router.delete("/:id/productos/:idProd", async (req, res) => {
//   const idCart = req.params.id;
//   const idProd = req.params.idProd;
//   const borrarId = await carritosDao.deleteProductById(idCart,idProd);
//   res.status(201).json(borrarId);
// });

router.post("/", async (req, res) => {
  let { body: data } = req;

  const producto = await carritosDao.newCart(data);
  logger.info(producto);
  client.messages 
      .create({ 
        body: `nuevo carrito creado
        fecha:${producto.timestamp},
        nombre:${data.nombre},
        descripcion:${data.descripcion},
        código: ${data.código},
        thumbnail: ${data.thumbnail},
        precio: ${data.precio},
        stock: ${data.stock},`,
        from: 'whatsapp:+14155238886',       
         to: `whatsapp:+${process.env.CELPHONE}`
       }) 
      .then(message => logger.info(message.sid)) 
      .done();
  res.status(201).json({ producto });
});

router.get("/:id/productos", async (req, res) => {
  const idCart = req.params.id;
  const producto = await carritosDao.getByIdProduct(idCart);
  res.status(201).json(producto);
});

export default router;
