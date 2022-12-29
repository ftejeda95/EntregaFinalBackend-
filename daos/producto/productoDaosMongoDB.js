import { Schema } from 'mongoose'
import ProductosModel from '../../model/productos.js';
import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js"

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
      console.log('ProductosDaoMongoDB Here')
        super(ProductosModel)
    }
}

export default ProductosDaoMongoDB
