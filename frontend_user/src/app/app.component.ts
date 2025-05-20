import { Component, inject } from '@angular/core';
import { IonApp, IonContent, IonHeader, IonIcon, IonImg, IonLabel, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { logOut } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet, IonLabel, IonIcon, IonHeader, IonContent, IonTitle, IonToolbar, IonImg],
})
export class AppComponent {
  public auth = inject(AuthService);
  private router = inject(Router);
  public profile: any 
  constructor() {
    addIcons({ logOut });
  }

  ngOnInit() {
    // Subscribe to profile updates
    this.auth.profile$.subscribe((updatedProfile) => {
      this.profile = updatedProfile;
      console.log('Profile updated:', this.profile);
    });
  }

  logout() {
    this.auth.isLoggedIn = false;
    this.router.navigate(['/tabs/account/login'], { queryParams: { reload: true } }); // Add a query parameter
  }
}
