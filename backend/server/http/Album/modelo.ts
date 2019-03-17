export class Album {

    private _id: number;
    private _nombre: string;
    private _fecha: string;
    
    private static _albumes : Album[] = [
        new Album({ 
            id : 1,
            nombre: "Album 1",
            fecha: "fecha"
        }),

        new Album({ 
            id : 2,
            nombre: "Album 2",
            fecha: "fecha"
        }),

        new Album({ 
            id : 3,
            nombre: "Album 3",
            fecha: "fecha"
        }),

        new Album({ 
            id : 4,
            nombre: "Album 4",
            fecha: "fecha"
        }),
    ];

    constructor(arg){
        this._id = arg.id;
        this._nombre = arg.nombre;
        this._fecha = arg.fecha;
    }

    public static crear(arg){
        return new Promise<Album>((resolve, reject) => {
            resolve(new Album(arg));
        })
    }

    public static buscarPorId(id: number){
        return new Promise<Album>((resolve, reject) => {
            let album = this._albumes.find(album => album._id == id);

            if(album){
                resolve(album);
            }else{
                reject('No se encontró el usuario we');
            }
        })
    }

    public static buscarTodos(){
        return new Promise<Album[]>((resolve, reject) => {
            resolve(this._albumes);
        })
    }

    public static eliminar(id: number){
        return new Promise<boolean>((resolve, reject) => {
            let album = this._albumes.find(album => album._id == id);

            if(album){
                console.log('Eliminando...')
                resolve(true);
            }else{
                resolve(false);
            }
        })
    }

    public static editar(arg){
        return new Promise<boolean>((resolve, reject) => {
            let album = this._albumes.find(album => album._id == arg.id);

            if(album){
                album.nombre = arg.nombre ? arg.nombre : album.nombre;
                album.fecha = arg.fecha ? arg.fecha : album.fecha;
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
}