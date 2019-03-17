export class Album {
    id: number;
    nombre: string;
    fecha: Date;
    IdCategoria: number;

    constructor(arg){
        this.id = arg.id;
        this.nombre = arg.nombre;
        this.fecha = new Date(arg.fecha);
        this.IdCategoria = arg.IdCategoria;
    }

    
}