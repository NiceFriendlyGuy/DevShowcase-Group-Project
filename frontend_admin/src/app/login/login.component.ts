import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginCredentials } from '../models/login-credentials.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  constructor() {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  error: string | null = null;

  public onSubmit() {
    const credentials: LoginCredentials = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    };

    if (this.loginForm.invalid) return;

    this.authService.login(credentials).subscribe({
      next: () => {
        const user = this.authService.getCurrentUser();
        console.log('Utilisateur connecté :', user);
        const targetRoute = user?.admin ? '/shell' : '/unauthorized';
        this.router.navigate([targetRoute]);
      },
    });
  }
}
