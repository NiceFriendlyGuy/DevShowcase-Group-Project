import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { IonButton} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { ProfilesService } from 'src/app/services/profiles.service';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon
  ],

})
export class LoginComponent  implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  loginForm: FormGroup;
  public isSignUp: boolean = false; // Flag to toggle between login and signup
  private profilesService: ProfilesService = inject(ProfilesService);

  constructor() {
    addIcons({ arrowBackOutline });
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.required, Validators.minLength(4)]] // Password field with validation
    });
    this.loginForm.get('name')?.disable(); // Disable the name field
   }

  ngOnInit() {
    this.clearForm(); // Clear the form when the component is initialized

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['reload']) {
        this.clearForm(); // Clear the form if "reload" is present in query params
      }
    });
  }


  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      if (this.isSignUp) {
        this.onSignUp(formData);
      } else {
        this.onLogIn(formData);
      }
    } else {
      console.log('Form is invalid');
      this.showError('Form is invalid. Please check your input.');
    }
  }

  private async onLogIn(formData: any): Promise<void> {
    const result = await this.authService.authUser(formData.email, formData.password);
    console.log("Logged: ",result);
    if (result) {
      this.authService.setProfileInfo(result);
      this.router.navigate(['/tabs/account/']);
      

    } else {
      console.error('Login failed: Invalid credentials');
      this.showError('Login failed: Invalid credentials');
    }
  }

  private async onSignUp(formData: any): Promise<void> {
    try {
      // Check if the email already exists
      const existingProfiles = await this.profilesService.getProfilesAll();
      const emailExists = existingProfiles.some(
        (profile: { email: string }) => profile.email === formData.email
      );

      if (emailExists) {
        alert('This email is already registered. Please use a different email.');
      } else {
        // Add the new profile
        const newProfile: any = {
          name: formData.name,
          email: formData.email,
          password: formData.password, // You may want to hash the password before sending it to the backend
        };
        console.log(newProfile);
        const result = this.profilesService.addProfile(newProfile) //await firstValueFrom(this.profilesService.addProfile(newProfile));
        console.log(result);
        // Redirect to the login page after successful registration
        alert('Profile registered successfully!');
        this.enableLogIn(); // Redirect to the login page
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred while registering. Please try again later.');
    }
  }

  

  enableSignUp() {
    this.clearForm()
    this.isSignUp = true; // Set the flag to true to show the signup form
    this.loginForm.get('name')?.enable(); // Enable the name field
  }
  enableLogIn() {
    this.clearForm()
    this.isSignUp = false; // Set the flag to false to show the login form
    this.loginForm.get('name')?.disable(); // Disable the name field
  }

  clearForm(): void {
    this.loginForm.reset();
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



