
  import mongoose, { Schema } from 'mongoose';

  const carrito = new Schema({
    productos: { type: Array, required: true },
  })
;


export default mongoose.model('Carrito', carrito);