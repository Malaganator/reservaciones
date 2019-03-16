import { Usuario } from './modelo';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export class UsuarioControlador {

    buscar = (req: Request, res: Response, next: NextFunction) => {
        if(req.params.id){
            Usuario.buscarPorId(req.params.id)
                .then(usuario => res.status(200).jsonp(usuario))
                .catch(err => res.status(500).jsonp(err));
        }else{
            Usuario.buscarTodos()
                .then(usuarios => res.status(200).jsonp(usuarios))
                .catch(err => res.status(500).jsonp(err));
        }
    }

    crear = (req: Request, res: Response, next: NextFunction) => {
        Usuario.crear(req.body)
            .then(usuario => res.status(200).jsonp(usuario))
            .catch(err => res.status(500).jsonp(err));
    }

    actualizar = (req: Request, res: Response, next: NextFunction) => {
        Usuario.editar(req.body)
            .then(seActualizo => res.status(200).json(seActualizo))
            .catch(err => res.status(500).jsonp(err))
    }

    eliminar = (req: Request, res: Response, next: NextFunction) => {
        Usuario.eliminar(req.params.id)
            .then(seElimino => res.status(200).json(seElimino))
            .catch(err => res.status(500).jsonp(err))
    }

}