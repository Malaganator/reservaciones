import {Router} from 'express'
import { AlbumControlador } from './controlador';

export class AlbumRutas{
    private _ruteador: Router;
    private controlador: AlbumControlador;

    constructor(){
        this._ruteador = Router();
        this.controlador = new AlbumControlador();
        this.configRutas();
    }

    private configRutas(){
        this._ruteador.route('/album')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .post(this.controlador.crear);

        this._ruteador.route('/album/:id')
            .get(this.controlador.buscar)
            .delete(this.controlador.eliminar);
    }

    get ruteador(){
        return this._ruteador;
    }
}