import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPagina = 4;
  pagina = 0;
  texto: string;
  genero: string;  
  filmes: Filme[] = [];
  filtroListagem: FormGroup;
  generos: Array<string>;

  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder

    ) { }

  ngOnInit(): void{
    this.filtroListagem = this.fb.group({
      texto: [''],
      genero: ['']
    })

    this.filtroListagem.get('texto').valueChanges.subscribe((val: string) => {
      this.texto = val;
      this.resetarConsulta();
    });

    this.filtroListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.genero = val;
      this.resetarConsulta();
    });

    this.generos= ['Ação', 'Romance', 'Aventura', 'Terror', 'Comedia', 'Ficção', 'Drama'];


    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtdPagina, this.texto, this.genero)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));

  }

  private resetarConsulta(): void {
    this.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
  
 
}
