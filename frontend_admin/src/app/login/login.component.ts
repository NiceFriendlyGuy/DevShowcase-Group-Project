import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { email, password } = this.form.value;

    // Fake login logic
    if (email === 'admin@example.com' && password === 'admin') {
      localStorage.setItem('token', 'mock-jwt-token');
      this.router.navigate(['/statistics']);
    } else {
      alert('Invalid credentials');
    }
  }
}
