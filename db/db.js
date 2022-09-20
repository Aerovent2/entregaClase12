const fs= require('fs')

class baseDeDatos {
    constructor(nombreDeArchivo){
        this.nombreDeArchivo=nombreDeArchivo
    }
    async  save(objeto){
        let objetos = []
        try{
            let buscarArchivos= await fs.promises.readdir('./db')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if(existe){
                let existente = await fs.promises.readFile(`./db/${this.nombreDeArchivo}`, 'utf-8')
                if(existente !== ''){
                     objetos = JSON.parse(existente)
                     if(objetos.length > 0){
                        let maxId = objetos[0].id
                        for(let i =0; i< objetos.length; i++){
                            if(maxId < objetos[i].id){
                                maxId=objetos[i].id
                            }
                        objeto.id = maxId+1
                        }
                     }
                }
            }else{
                objeto.id=1
            }
            objetos.push(objeto)
            await fs.promises.writeFile(`./db/${this.nombreDeArchivo}`, JSON.stringify(objetos))
            return objeto.id
        }catch(err){
            console.error(`hubo un error al guardar el archivo : ${err}`)
        }
    }
    async getAll(){
        try{
            let buscarArchivos= await fs.promises.readdir('./db')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if (existe){
                let leer = await fs.promises.readFile(`./db/${this.nombreDeArchivo}`, 'utf-8')
                let encontrado =  JSON.parse(leer)
                if(encontrado){
                    return encontrado
                }else{
                    return null
                } 
            }else{
                return ('no existe archivo')
            }

        }catch(err){
            console.log(`hubo un error al buscar todos : ${err}`)
        } 
    }
    
}




module.exports = baseDeDatos