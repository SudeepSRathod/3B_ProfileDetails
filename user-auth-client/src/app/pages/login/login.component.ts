import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Import this

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule] // ✅ Add RouterModule
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        if (res.token && res.user) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          alert('Login successful!');
          this.router.navigate(['/profile']); // ✅ Redirect to profile
        } else {
          alert('Invalid response. Login failed.');
        }
      },
      error: (err: any) => {
        alert(err.error.message || 'Login failed!');
      }
    });
  }
}
