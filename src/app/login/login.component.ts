import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ApiService } from '../../services/api.service';

interface LoginResponse {
  token: string;
  refreshToken: string;
  expiration: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoadingResults = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  async addLogin(): Promise<void> {

    if (this.loginForm.invalid) return;

    this.isLoadingResults = true;
    this.errorMessage = '';

    // Pega os valores do formulário (letras minúsculas = objetos reais)
    const credenciais = this.loginForm.value;

    this.api.Login(credenciais)
      .subscribe({
        next: (res: LoginResponse) => {
          if (res && res.token) {
            localStorage.setItem('jwt', res.token);
            this.isLoadingResults = false;
            this.router.navigate(['/categorias']);
          } else {
            this.errorMessage = 'Token não recebido. Verifique o servidor.';
            this.isLoadingResults = false;
          }
        },
        error: (err: any) => {
          console.error('Erro no login:', err);
          this.errorMessage = 'Email ou senha inválidos.';
          this.isLoadingResults = false;
        }
      });
  }
}
