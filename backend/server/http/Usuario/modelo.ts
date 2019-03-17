const data = require('../../conf/usuarios.data.json');
import fs from 'fs'
import path from 'path';
export class Usuario{
    private _id: number;
    private _nombre: string;
    private _correo: string; 
    private _contrasena: string;
    private static _usuarios: Usuario[] = data.Usuarios.map(n => new Usuario(n));

    constructor(arg){
        this._id = arg.id;
        this._nombre = arg.nombre;
        this._correo = arg.correo;
        this._contrasena = arg.contrasena;
    }

    public static crear(arg){
        return new Promise<Usuario>((resolve, reject) => {
            this._usuarios.push(new Usuario(arg))
            let json = {"Usuarios": this._usuarios.map(n => n.toJson())}
            this.sobreEscribir(json)
                .then(response=> response ? resolve(new Usuario(arg)) : reject(false))
        })
    }

    public static buscarPorId(id: number){
        return new Promise<Usuario>((resolve, reject) => {
            let usuario = this._usuarios.find(usuario => usuario._id == id);
            if(usuario){
                resolve(usuario)

            }else{
                reject('No se encontró el usuario we');
            }
        })
    }

    public static buscarTodos(){
        return new Promise<Usuario[]>((resolve, reject) => {
            resolve(this._usuarios);
        })
    }

    public static eliminar(id: number){
        return new Promise<boolean>((resolve, reject) => {
            let usuario = this._usuarios.find(usuario => usuario._id == id);
            if(usuario){
                this._usuarios.splice(this._usuarios.indexOf(usuario), 1)
                let json = {"Usuarios": this._usuarios.map(n=> n.toJson())}
                this.sobreEscribir(json)
                    .then(response=> response ? resolve(true) : reject(false))
            }else{
                resolve(false);
            }
        })
    }

    public static editar(arg){
        return new Promise<boolean>((resolve, reject) => {
            let usuario = this._usuarios.find(usuario => usuario._id == arg.id);
            if(usuario){
                let index =this._usuarios.indexOf(usuario);
                usuario.nombre = arg.nombre ? arg.nombre : usuario.nombre;
                usuario.correo = arg.correo ? arg.correo : usuario.correo;
                usuario.contrasena = arg.contrasena ? arg.contrasena : usuario.contrasena;
                this._usuarios[index] = usuario
                let json = {"Usuarios": this._usuarios.map(n => n.toJson())}
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
    
    get correo(){
        return this._correo;
    }

    set correo(value: string){
        this._correo = value;
    }
    
    get contrasena(){
        return this._contrasena;
    }

    set contrasena(value: string){
        this._contrasena = value;
    } 

    public toJson(){
        return {
            "id": this._id,
            "nombre": this._nombre,
            "correo": this._correo,
            "contrasena":this._contrasena
        }
    }
    
    private static sobreEscribir(json){
        return new Promise<boolean>((resolve, reject) => {
            fs.exists(
                path.join(__dirname, '../../conf/usuarios.data.json'),
                (exist) => {
                    if(exist){
                        console.log('si existe')
                        fs.writeFile(
                            path.join(__dirname, '../../conf/usuarios.data.json'),
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
