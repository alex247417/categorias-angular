import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { ApiService } from '../../services/api.service';
import { Categoria } from '../../model/categoria';

@Component({
  selector: 'app-categorias',
  standalone: true,
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class CategoriasComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'imagem', 'acao'];
  dataSource: Categoria[] | null = null;
  isLoadingResults = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCategorias().subscribe({
      next: (res: Categoria[]) => {
        this.dataSource = res;
        setTimeout(() => this.isLoadingResults = false); // ← adiciona o setTimeout
      },
      error: (err) => {
        console.error(err);
        setTimeout(() => this.isLoadingResults = false); // ← aqui também
      }
    });
  }

}
