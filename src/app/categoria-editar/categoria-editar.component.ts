import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categoria-editar',
  standalone: true,
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CategoriaEditarComponent implements OnInit {

  categoriaId: string = '';  // ← string, não number
  categoriaForm!: FormGroup;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categoriaForm = this.formBuilder.group({
      categoriaId: [null],
      nome: [null, Validators.required],
      imagemUrl: [null, Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('ID no editar:', id);
    this.getCategoria(id);
  }

  getCategoria(id: string): void {
    this.api.getCategoria(id).subscribe({
      next: (data) => {
        if (!data) return; // ← adiciona essa verificação

        this.categoriaId = data.categoriaId;
        this.categoriaForm.patchValue({
          categoriaId: data.categoriaId,
          nome: data.nome,
          imagemUrl: data.imagemUrl
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateCategoria(): void {
    if (this.categoriaForm.invalid) return;

    this.isLoadingResults = true;

    this.api.updateCategoria(this.categoriaId, this.categoriaForm.value)
      .subscribe({
        next: () => {
          this.isLoadingResults = false;
          void this.router.navigate(['/categoria-detalhe', this.categoriaId]);
        },
        error: (err) => {
          console.error(err);
          this.isLoadingResults = false;
        }
      });
  }
}
