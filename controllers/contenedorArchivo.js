import { promises as fs } from 'fs'
import config from '../config.js'

class ContenedorArchivo {

    constructor(pathFile) {
        this.pathFile = `${config.fileSystem.path}/${pathFile}`;
    }

    async readById(id) {
        const objs = await this.readAll()
        const buscado = objs.find(o => o.id == id)
        return buscado
    }

    async readAll() {
        try {
            const objs = await fs.readFile(this.pathFile, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async createElemt(obj) {
        const objs = await this.readAll()

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        objs.push(newObj)
        try {
            await fs.writeFile(this.pathFile, JSON.stringify(objs, null, 2))
            return newObj
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async updateById(elem, id) {
        const objs = await this.readAll()
        const index = objs.findIndex(obj => obj.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = elem
            try {
                await fs.writeFile(this.pathFile, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }

    async deleteById(id) {
        const objs = await this.readAll()
        const index = objs.findIndex(obj => obj.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            await fs.writeFile(this.pathFile, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.pathFile, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}


export default ContenedorArchivo