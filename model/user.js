import mongoose, { Schema } from 'mongoose';

const user = new Schema(
      {
            password: { type: String, require: true },
            email: {
                  type: String,
                  require: true,
                  unique: true,
                  index: true,
                  validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
            },
            nombre: { type: String, require: true },
            direccion: { type: String, require: true },
            edad: { type: Number, require: true }, 
            telefono:{ type: Number, require: true } ,
            foto:{ type: String, require: true } ,
      },
      { timestamps: true }
);

export default mongoose.model('User', user);