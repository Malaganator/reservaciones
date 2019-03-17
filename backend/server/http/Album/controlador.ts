import { Album } from './modelo';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export class AlbumControlador {

    buscar = (req: Request, res: Response, next: NextFunction) => {
        if(req.params.id){
            Album.buscarPorId(req.params.id)
                .then(album => res.status(200).jsonp(album.toJson()))
                .catch(err => res.status(500).jsonp(err));
        }else{
            Album.buscarTodos()
                .then(albumes => res.status(200).jsonp(albumes.map(n => n.toJson())))
                .catch(err => res.status(500).jsonp(err));
        }
    }

    crear = (req: Request, res: Response, next: NextFunction) => {
        Album.crear(req.body)
            .then(album => res.status(200).jsonp(album.toJson()))
            .catch(err => res.status(500).jsonp(err));
    }

    actualizar = (req: Request, res: Response, next: NextFunction) => {
        Album.editar(req.body)
            .then(seActualizo => res.status(200).json(seActualizo))
            .catch(err => res.status(500).jsonp(err))
    }

    eliminar = (req: Request, res: Response, next: NextFunction) => {
        Album.eliminar(req.params.id)
            .then(seElimino => res.status(200).json(seElimino))
            .catch(err => res.status(500).jsonp(err))
    }

}