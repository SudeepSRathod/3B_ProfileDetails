import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule]
})
export class ProfileComponent {
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    }
  }

  logout(): void {
    this.auth.logout(); // This will remove the token from localStorage and navigate to login
    this.router.navigate(['/login']);
  }
}
