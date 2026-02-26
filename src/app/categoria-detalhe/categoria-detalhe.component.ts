import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Categoria } from '../../model/categoria';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categoria-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './categoria-detalhe.component.html',
  styleUrls: ['./categoria-detalhe.component.scss']
})
export class CategoriaDetalheComponent implements OnInit {

  categoria: Categoria = { categoriaId: '', nome: '', imagemUrl: '' };
  isLoadingResults = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log('id da rota:', id);

    this.api.getCategoria(id).subscribe({
      next: (data: Categoria) => {
        this.categoria = data;
        this.isLoadingResults = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
        this.isLoadingResults = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteCategoria(id: string): void {
    this.isLoadingResults = true;
    this.api.deleteCategoria(id).subscribe({
      next: () => {
        this.isLoadingResults = false;
        void this.router.navigate(['/categorias']);
      },
      error: (err: any) => {
        console.error(err);
        this.isLoadingResults = false;
      }
    });
  }
}
