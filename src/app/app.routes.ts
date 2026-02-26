import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'categorias',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./logout/logout.component').then(m => m.LogoutComponent)
  },
  {
    path: 'categorias',
    loadComponent: () =>
      import('./categorias/categorias.component').then(m => m.CategoriasComponent)
  },
  {
    path: 'categoria-nova',
    loadComponent: () =>
      import('./categoria-nova/categoria-nova.component').then(m => m.CategoriaNovaComponent)
  },
  {
    path: 'categoria-detalhe/:id',
    loadComponent: () =>
      import('./categoria-detalhe/categoria-detalhe.component').then(m => m.CategoriaDetalheComponent)
  },
  {
    path: 'categoria-editar/:id',
    loadComponent: () =>
      import('./categoria-editar/categoria-editar.component').then(m => m.CategoriaEditarComponent)
  }
];
