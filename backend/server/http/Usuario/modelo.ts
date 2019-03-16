
export class Usuario{
    private _id: number;
    private _nombre: string;
    private _correo: string; 
    private _contrasena: string;
    private static _usuarios: Usuario[] = [
        new Usuario({
            id: 1,
            nombre: 'Ulises Gonzalez',
            correo: 'ulises@obisey.com',
            contrasena: '1234'
        }),
        new Usuario({
            id: 2,
            nombre: 'Cesar Cordoba',
            correo: 'cesar@obisey.com',
            contrasena: '1234'
        }),
        new Usuario({
            id: 3,
            nombre: 'Ramon',
            correo: 'ramon@obisey.com',
            contrasena: '1234'
        }),
        new Usuario({
            id: 4,
            nombre: 'Josue Yepez',
            correo: 'josue@obisey.com',
            contrasena: '1234'
        }),
        new Usuario({
            id: 5,
            nombre: 'Fernando Jerezano',
            correo: 'jerezano@obisey.com',
            contrasena: '1234'
        }),
        new Usuario({
            id: 6,
            nombre: 'Luis Malaga',
            correo: 'malaga@obisey.com',
            contrasena: '1234'
        }),                                                            
    ];

    constructor(arg){
        this._id = arg.id;
        this._nombre = arg.nombre;
        this._correo = arg.correo;
        this._contrasena = arg.contrasena;
    }

    public static crear(arg){
        return new Promise<Usuario>((resolve, reject) => {
            resolve(new Usuario(arg));
        })
    }

    public static buscarPorId(id: number){
        return new Promise<Usuario>((resolve, reject) => {
            let usuario = this._usuarios.find(usuario => usuario._id == id);

            if(usuario){
                resolve(usuario);
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
                console.log('Eliminando...')
                resolve(true);
            }else{
                resolve(false);
            }
        })
    }

    public static editar(arg){
        return new Promise<boolean>((resolve, reject) => {
            let usuario = this._usuarios.find(usuario => usuario._id == arg.id);

            if(usuario){
                usuario.nombre = arg.nombre ? arg.nombre : usuario.nombre;
                usuario.correo = arg.correo ? arg.correo : usuario.correo;
                usuario.contrasena = arg.contrasena ? arg.contrasena : usuario.contrasena;
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
}
