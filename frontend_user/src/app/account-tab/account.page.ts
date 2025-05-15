import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCheckbox, IonButtons, IonMenuButton, IonIcon, IonLabel, AlertController } from '@ionic/angular/standalone';
import { ProfileComponent } from '../components/profile/profile.component'
import { ProfileEditComponent } from '../components/profile-edit/profile-edit.component'
import { ProfilesService } from '../services/profiles.service';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { logOut } from 'ionicons/icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,IonCheckbox, IonLabel, ProfileComponent, ProfileEditComponent],
})
export class AccountPage {
  private profilesService = inject(ProfilesService);
  private auth = inject(AuthService);
  public profile: any = null;
  private router = inject(Router);
  private alertController = inject(AlertController);
  public editMode: boolean = false;
  
  constructor() {
    addIcons({ logOut });
    this.profile = this.auth.getProfileInfo();
    console.log('Profile:', this.profile);
  }
  
  logout() {
    this.auth.isLoggedIn = false;
    this.router.navigate(['/tabs/account/login']);
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('delering', this.profile);
            this.profilesService.deleteProfile(this.profile.userId);
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  refreshProfile(){
    this.profile = this.profilesService.getProfilesById(this.profile.userId)[0];
    this.editMode = false
    console.log('Profile:', this.profile);
  }

}
