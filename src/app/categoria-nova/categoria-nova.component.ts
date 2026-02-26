import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categoria-nova',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule   // 👈 ADICIONA AQUI
  ],
  templateUrl: './categoria-nova.component.html',
  styleUrl: './categoria-nova.component.scss'
})
export class CategoriaNovaComponent implements OnInit {

  categoriaForm!: FormGroup;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categoriaForm = this.formBuilder.group({
      nome: [null, Validators.required],
      imagemUrl: [null, Validators.required]
    });
  }

  addCategoria(): void {

    if (this.categoriaForm.invalid) return;

    this.isLoadingResults = true;

    this.api.addCategoria(this.categoriaForm.value)
      .subscribe({
        next: () => {
          this.isLoadingResults = false;
          this.router.navigate(['/categorias']);
        },
        error: (err) => {
          console.error(err);
          this.isLoadingResults = false;
        }
      });
  }
}
