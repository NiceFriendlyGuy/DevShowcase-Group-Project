import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCheckbox, IonButtons, IonMenuButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { ProfileComponent } from '../components/profile/profile.component'
import { ProfilesService } from '../services/profiles.service';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { logOut } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,IonCheckbox, IonLabel, ProfileComponent],
})
export class AccountPage {
  private profilesService = inject(ProfilesService);
  private auth = inject(AuthService);
  public profile: any = () => this.auth.getProfileInfo();
  private router = inject(Router);
  
  constructor() {
    addIcons({ logOut });
  }
  
  logout() {
    this.auth.isLoggedIn = false;
    this.router.navigate(['/tabs/account/login']);
  }
}
