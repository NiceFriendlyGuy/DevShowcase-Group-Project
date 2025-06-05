import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from '../models/login-credentials.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../environement';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = environment.BASE_URL + '/auth';
  private userSubject = new BehaviorSubject<any>(this.loadUser());

  user$ = this.userSubject.asObservable(); // components can subscribe to this

  private loadUser(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.user) {
          // Save auth status and user info
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(response.user));
          this.userSubject.next(response.user); // ✅ push new user
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  public isAdmin(): boolean {
    const userJson = localStorage.getItem('user');
    if (!userJson) return false;
    const user = JSON.parse(userJson);
    return user.admin === true;
  }

  public getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  public getUser(): any | null {
    return this.userSubject.value;
  }
}
