import { Schema } from "mongoose";
import logger from "../../logger.js"

import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js";
import CarritoModel from '../../model/carrito.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    logger.info("CarritosDaoMongoDB Here");
    super(CarritoModel);
  }

  async newCart(data) {
    try {
      let cart = {};
      cart["timestamp"] = new Date().toLocaleString();
      cart["productos"] = [data];
      this.createElemt(cart);
      return cart;
    } catch (error) {
      logger.info("[newCart] CarritosDaosMongoDb", error.message);
    }
  }
  async createById(idCart, data) {
    try {
          let productos;
          let cart = await this.readById(idCart);
          productos = [...cart.productos, data];
          cart.productos = productos
          logger.info(cart)
          return await this.updateById(idCart, cart);
    } catch (error) {
          logger.error(
                '[newProductCart] CarritosDaosMongoDb',
                error.message
          );
    }
}

async getByIdProduct(id) {
    try {
          const data = await this.readById(id);
          let response = [];
          data.productos.map((item) => {
                response.push(item);
          });
          return response;
    } catch (error) {
          logger.error(
                '[getByIdProduct] CarritosDaosMongoDb',
                error.message
          );
    }
}

// async deleteProductById(idCart, idProduct) {
//     try {
//           let productos;
//           let cart = await this.readById(idCart);
//           productos = [...cart.productos];
//           let newProd=productos.filter(productos.id !== idProduct)
//           cart.productos = newProd
//           return await this.updateById(idCart, cart);

//     } catch (error) {
//           console.log(
//                 '[deleteProductById] CarritosDaosMongoDb',
//                 error.message
//           );
//     }
// }
}

export default CarritosDaoMongoDB;
