import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class LogoutComponent {

  constructor(private router: Router) {}

  async logout(): Promise<void> {
    localStorage.removeItem('jwt');
    await this.router.navigate(['/login']);
  }
}
