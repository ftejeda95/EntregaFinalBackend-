import ContenedorFirebase from "../../controllers/contenedorFirebase.js"

class ProductosDaoFire extends ContenedorFirebase {
    constructor() {
        super('productos')
    }
    async guardar(products=[]) {
        return super.createElemt(products)
    }
}

export default ProductosDaoFire