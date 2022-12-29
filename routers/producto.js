import { Router } from "express";
import {productosDao} from './../daos/index.js'
import {UsuariosDao} from './../daos/index.js'
import logger from "../logger.js";

const router = Router(Router);

const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized to zone private.' })
  }
}


router.put("/:id/:admin", async (req, res) => {
  let admi = "true";
  const administrador = req.params.admin;
  if (admi == administrador) {
    const data = req.body;
    const idProducto = req.params.id;
    logger.info(idProducto)
    const producto = await productosDao.updateById(idProducto,data);
    res.status(201).json(producto);
  } else {
    return res.status(401).json(error.enviarError(req));
  }
});

router.delete("/:id/:admin", async (req, res) => {
    let admi = "true";
    const administrador = req.params.admin;
    if (admi == administrador) {
      const idProducto = req.params.id;
      const borrarId = await productosDao.deleteById(idProducto);
      res.status(201).json(borrarId);
    } else {
      return res.status(401).json(error.enviarError(req));
    }
  });
  
  router.delete("/:admin", async (req, res) => {
    let admi = "true";
    const administrador = req.params.admin;
    if (admi == administrador) {
      const borrar = await productosDao.deleteAll();
      res.status(201).json(borrar);
    } else {
      return res.status(401).json(error.enviarError(req));
    }
  });

  router.post("/:admin", async (req, res) => {
    let admi = "true";
    const administrador = req.params.admin;
    if (admi == administrador) {
      let { body: data } = req;
      const producto = await productosDao.createElemt([data]);
      res.status(201).json(producto);
    } else return res.status(401).json(error.enviarError(req));
  });

  
router.get("/:id?/:admin", async (req, res) => {
    let admi = "true";
    const administrador = req.params.admin;
    if (admi == administrador || administrador == "false") {
      const idProducto = req.params.id;
      const producto = await productosDao.readById(idProducto);
      res.status(201).json(producto);
    } else {
      return res.status(401).json(error.enviarError(req));
    }
  });

  router.get("/", verifyAuth, async (req, res) => {

      const productos = await productosDao.readAll()
      const user = (await UsuariosDao.readById(req.user._id))
      const userNombre=user.nombre
      const userFoto=user.foto
      await res.render("home",{productos, isEmpty: !productos.length , userNombre,userFoto});

  });
export default router;