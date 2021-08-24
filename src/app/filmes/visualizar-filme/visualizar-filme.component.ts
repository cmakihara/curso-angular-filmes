import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {
  readonly semFoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbT89BuQ6AX9VuzxmHqJ5RHgKNwvE2VrO6Vw&usqp=CAU";

  filme: Filme;

  constructor(private activatedRoute: ActivatedRoute,
              private filmesService: FilmesService          
    ) { }

  ngOnInit() {
    this.visualizar(this.activatedRoute.snapshot.params['id']);
  }

  private visualizar(id: number) : void {
    this.filmesService.visualizar(id).subscribe((filme: Filme) => this.filme = filme);
  }

}
