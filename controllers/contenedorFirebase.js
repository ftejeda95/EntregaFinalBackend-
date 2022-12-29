import FirebaseAdmin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { readFile } from "fs/promises";
import logger from "../logger.js"

const urlJson= 'file:///C:/Users/Usuario/OneDrive/Escritorio/Backend/primerEntregaFinal/'
const cert = JSON.parse(
  await readFile(new URL(process.env.FIREBASE_CERT_PATH,urlJson))
);

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(cert),
});

logger.info("Conectados a Firebase!");

class ContenedorFirebase {
    constructor(collection){
        this.collection = collection
    }
    
  async createElemt(elemt) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      let id = uuidv4();
      let doc = query.doc(id)
      if(elemt.lengt == 1){
        await doc.create(elemt)
      }else if(elemt.lengt >= 1){
        elemt.map((e) => {
          let doc = query.doc(id);
          doc.create(e);
        });
      }else{
        await doc.create(elemt)
      }

      logger.info("[createElemt] Usuarios creados con éxito!");
    } catch (error) {
      logger.error("[createElemt] Ocurrio un error ->", error.message);
    }
  }

  async readAll() {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;
      const response = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      logger.info("[readAll] Usuarios obtenidos con éxito! ->", response);
    } catch (error) {
      logger.error(
        "[readAll] Ocurrio un error al intentar obtener usuarios  ->",
        error.message
      );
    }
  }

  async readById(id) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc(id);
      const item = await doc.get();
      const response = item.data();
      if (response) {
        logger.info(
          `[readById] Usuario ${id} obtenido con éxito! ->`,
          response
        );
        return response
      } else {
        logger.info(`[readById] Usuario ${id} no encontrado`);
      }
    } catch (error) {
      logger.error(
        `[readById] Ocurrio un error al intenter obtener usuario ${id} ->`,
        error.message
      );
    }
  }

  async updateById(data,id) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc(id);
      await doc.update(data);
      logger.info(`[updateById] Usuario ${id} actualizado con éxito!`);
    } catch (error) {
      logger.error(
        `[updateById] Ocurrio un error al intentar actualizar usuario ${id} ->`,
        error.message
      );
    }
  }

  async deleteById(id) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc(id);
      await doc.delete();
      logger.info(`[deleteById] Usuario ${id} eliminado con éxito!`);
    } catch (error) {
      logger.error(
        `[deleteById] Ocurrio un error al intentar eliminado usuario ${id} ->`,
        error.message
      );
    }
  }
   async deleteAll() {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc();
      await doc.delete();
      logger.info(`[deleteAll] Elementos eliminados con éxito!`);
    } catch (error) {
      logger.error(
        `[deleteAll] Ocurrio un error al intentar eliminado usuario ${id} ->`,
        error.message
      );
    }
  }
}
export default ContenedorFirebase;
