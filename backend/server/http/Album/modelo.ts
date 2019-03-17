const data = require('../../conf/albumnes.data.json');
import fs from 'fs'
import path from 'path';
export class Album{
    private _id: number;
    private _nombre: string;
    private _fecha: string; 
    private static albumes: Album[] = data.Albumes.map(n => new Album(n));

    constructor(arg){
        this._id = arg.id;
        this._nombre = arg.nombre;
        this._fecha = arg.fecha;
    }

    public static crear(arg){
        return new Promise<Album>((resolve, reject) => {
            this.albumes.push(new Album(arg))
            let json = {"Albumes": this.albumes.map(n => n.toJson())}
            this.sobreEscribir(json)
                .then(response=> response ? resolve(new Album(arg)) : reject(false))
        })
    }

    public static buscarPorId(id: number){
        return new Promise<Album>((resolve, reject) => {
            let album = this.albumes.find(usuario => usuario._id == id);
            if(album){
                resolve(album)

            }else{
                reject('No se encontró el usuario we');
            }
        })
    }

    public static buscarTodos(){
        return new Promise<Album[]>((resolve, reject) => {
            resolve(this.albumes);
        })
    }

    public static eliminar(id: number){
        return new Promise<boolean>((resolve, reject) => {
            let album = this.albumes.find(album => album._id == id);
            if(album){
                this.albumes.splice(this.albumes.indexOf(album), 1)
                let json = {"Albumes": this.albumes.map(n=> n.toJson())}
                this.sobreEscribir(json)
                    .then(response=> response ? resolve(true) : reject(false))
            }else{
                resolve(false);
            }
        })
    }

    public static editar(arg){
        return new Promise<boolean>((resolve, reject) => {
            let album = this.albumes.find(usuario => usuario._id == arg.id);
            if(album){
                let index =this.albumes.indexOf(album);
                album.nombre = arg.nombre ? arg.nombre : album.nombre;
                album.fecha = arg.fecha ? arg.fecha : album.fecha;
                this.albumes[index] = album
                let json = {"Albumes": this.albumes.map(n => n.toJson())}
                this.sobreEscribir(json)
                    .then(response=> response ? resolve(true) : reject(false))
                resolve(true)
            }else{
                resolve(false);
            }
        })
    }

    get id(){
        return this._id;
    }

    set id(value: number){
        this._id = value;
    }

    get nombre(){
        return this._nombre;
    }

    set nombre(value: string){
        this._nombre = value;
    }
    
    get fecha(){
        return this._fecha;
    }

    set fecha(value: string){
        this._fecha = value;
    }

    public toJson(){
        return {
            "id": this._id,
            "nombre": this._nombre,
            "fecha" : this._fecha
        }
    }
    
    private static sobreEscribir(json){
        return new Promise<boolean>((resolve, reject) => {
            fs.exists(
                path.join(__dirname, '../../conf/albumnes.data.json'),
                (exist) => {
                    if(exist){
                        console.log('si existe')
                        fs.writeFile(
                            path.join(__dirname, '../../conf/albumnes.data.json'),
                            JSON.stringify(json, null, 4),
                            (err) => {
                                console.log(err)
                                if(err)
                                    reject(err)
                                resolve(true)
                            }
                        )
                    }else{
                        console.log('no existe')
                        reject(false);
                    }
            })
        })
    }
}
