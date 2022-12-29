import mongoose from 'mongoose'
import config from '../config.js'
import logger from "../logger.js"

class ContenedorMongoDB {
  constructor(schema) {
      this.collection = schema
  }
  async connect() {
    try {
          const URI = config.MONGO_URL.URI;
          await mongoose.connect(URI);
          logger.info('Conectado a la Base de datos MongoDb');
    } catch (error) {
          logger.error('[connect] ContenedorMongoDb', error.message);
    }
}
  async readById(id) {
    return await this.collection.findOne({_id: id}).lean()
  }

  async readAll() {
    let all = this.collection.find({}, { __v: 0 }).lean()
    return all;
  }

  async createElemt(obj) {
    const result = await this.collection.create(obj)
    return result
  }

  async updateById(elemID,modif) {
 
    return this.collection.updateOne({_id: elemID },{$set:modif})
  }

  async deleteById(id) {
    return this.collection.deleteOne({_id: id})
  }

  async deleteAll() {
    return this.collection.find({}).deleteMany({})
  }
}

export default ContenedorMongoDB