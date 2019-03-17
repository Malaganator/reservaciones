import { AlbumService } from './../../../servicios/Album.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AlbumService]
})
export class HomeComponent implements OnInit {
  albunes = []
  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.albumService.buscarTodosAlbumes().subscribe(albunes => {
      this.albunes = albunes;
    })
  }

}
