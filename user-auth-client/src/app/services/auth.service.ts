import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  // Register a new user
  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      catchError((error) => {
        console.error('Registration failed', error);
        return of({ success: false, message: 'Registration failed. Please try again.' });
      })
    );
  }

  // Login user
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return of({ success: false, message: 'Login failed. Please try again.' });
      })
    );
  }
  
  // Get user profile
  getProfile() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/profile`, { headers }).pipe(
      catchError((error) => {
        console.error('Fetching profile failed', error);
        return of({ success: false, message: 'Failed to fetch profile. Please log in again.' });
      })
    );
  }

  // Get current user from localStorage
  getCurrentUser(): any {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
