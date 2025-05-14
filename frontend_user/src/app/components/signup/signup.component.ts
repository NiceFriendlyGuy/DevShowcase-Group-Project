import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonButton, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProfilesService } from 'src/app/services/profiles.service';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule,ReactiveFormsModule, IonHeader, IonContent, IonButton, IonToolbar, IonTitle],
})
export class SignupComponent  implements OnInit {
  signupForm: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private profilesService: ProfilesService = inject(ProfilesService);

  constructor() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
   }

  ngOnInit() {}

  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;

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
          this.router.navigate(['/tabs/account/login']);
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred while registering. Please try again later.');
      }
    }
  }

}
