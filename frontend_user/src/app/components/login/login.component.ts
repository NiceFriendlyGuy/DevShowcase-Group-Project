import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IonButton} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],

})
export class LoginComponent  implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.required, Validators.minLength(4)]] // Password field with validation
    });
   }

  ngOnInit() {}


  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {

      // Add logic to handle login (e.g., call a service to authenticate)
      const result = await this.authService.authUser(this.loginForm.value.email, this.loginForm.value.password);
      if (result) {
        if (result.student) {
          //this.authService.setUserInfo(result.student);
          this.router.navigate(['/tabs/account/']);
        }
        else {
          this.showError(result.message);
        }

      } else {
        console.error('Login failed: Invalid credentials');
        this.showError('Login failed: Invalid credentials');
      }
      
    } else {
      console.log('Form is invalid');
      this.showError('Form is invalid. Please check your input.');
    }
  }

   public byPass(): void {
    const userInfo = {
          email: "",
          password: "",
          given_name: "Antonio"
    }
        console.log('Login successful:', userInfo);
        //this.authService.setUserInfo(userInfo);
        this.authService.isLoggedIn = true;
        this.router.navigate(['/tabs/account/']);
  }

  showError(message: string): void {
    alert(message);
  }


}



