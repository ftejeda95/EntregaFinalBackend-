import ContenedorFirebase from "../../controllers/contenedorFirebase.js"
import logger from "../../logger.js"

class CarritosDaoFire extends ContenedorFirebase {
    constructor() {
        super('carritos')
    }
    async newCart(data) {
        try {
          let cart = {};
          cart["timestamp"] = new Date().toLocaleString();
          cart["productos"] = [data];
          this.createElemt(cart);
          return cart;
        } catch (error) {
          logger.error("[newCart]", error.message);
        }
      }
      async createById(idCart, data) {
        try {
              let productos;
              let cart = await this.readById(idCart);
              productos = [...cart.productos, data];
              cart.productos = productos
              logger.info(cart.productos)
              return await this.updateById(cart,idCart);
        } catch (error) {
              logger.error(
                    '[createById]',
                    error.message
              );
        }
    }
    
    async getByIdProduct(id) {
        try {
              const data = await this.readById(id);
              let response = [];
              if( data.productos.legth >= 0){
              data.productos.map((item) => {
                    response.push(item);
              });
              return response;
                } else {
                return data.productos;
              }
              
        } catch (error) {
              logger.error(
                    '[getByIdProduct]',
                    error.message
              );
        }
    }
    
}

export default CarritosDaoFire