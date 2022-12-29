
  import mongoose, { Schema } from 'mongoose';

  const producto = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    stock: { type: Number, required: true },
    precio: { type: Number, required: true },
    codigo: { type: Number, required: true, index: true, unique: true },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true },
  })


export default mongoose.model('Producto', producto);