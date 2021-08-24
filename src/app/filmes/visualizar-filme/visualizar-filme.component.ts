import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {
  readonly semFoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbT89BuQ6AX9VuzxmHqJ5RHgKNwvE2VrO6Vw&usqp=CAU";

  filme: Filme;
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private filmesService: FilmesService,
              public dialog: MatDialog,
              private router: Router         
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']
    this.visualizar();
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Certeza',
        corBtnCancelar:'primary',
        corBtnSucesso:'warn',
        descricao:'Certeza??',
        possuirBtnFechar: true
      }as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if(opcao) {
        this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    });
  }

  private visualizar() : void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
  }

}
