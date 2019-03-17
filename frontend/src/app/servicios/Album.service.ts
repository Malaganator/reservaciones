import { API } from './../../environments/environment.prod';
import { Album } from "../modelos/Album.model";
import { Injectable } from '@angular/core';
import {HttpClient, HttpXhrBackend, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AlbumService{

    constructor(private htpp: HttpClient){

    }

    crearAlbum(album: Album){
        return this.htpp.post<Album>(API.url + '/album', album);
    }

    buscarAlbum(id: number){
        return this.htpp.get<Album>(API.url + '/album/' + id);
    }

    buscarTodosAlbumes(){
        return this.htpp.get<Album[]>(API.url + '/album');
    }

    editaralbum(album: Album){
        return this.htpp.put<boolean>(API.url + '/album', album)
    }

    eliminarAlbum(id: number){
        return this.htpp.delete<boolean>(API.url + '/album/' + id)
    }
}


