import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IonButton} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink
  ],

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
      console.log("Logged: ",result);
      if (result) {
        this.authService.setProfileInfo(result);
        this.router.navigate(['/tabs/account/']);
        

      } else {
        console.error('Login failed: Invalid credentials');
        this.showError('Login failed: Invalid credentials');
      }
      
    } else {
      console.log('Form is invalid');
      this.showError('Form is invalid. Please check your input.');
    }
  }

   public async byPass(): Promise<void> {
    console.log("Bypass");
    const userInfo = {
      id: 6,
      email: "tester@gmail.com",
      password: "1234",
      name: "Tester"
    }
    const result = await this.authService.authUser(userInfo.email, userInfo.password);
    this.authService.setProfileInfo(result);
    this.router.navigate(['/tabs/account/']);
  }

  showError(message: string): void {
    alert(message);
  }


}



