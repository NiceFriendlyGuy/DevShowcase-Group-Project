import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonCard,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonLabel,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfileEditComponent } from '../components/profile-edit/profile-edit.component';
import { ProfilesService } from '../services/profiles.service';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { logOut, close, add, pencil } from 'ionicons/icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
  imports: [
    CommonModule,
    IonFab,
    IonFabButton,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonLabel,
    ProfileComponent,
    ProfileEditComponent,
  ],
})
export class AccountPage {
  private profilesService = inject(ProfilesService);
  private projectsService = inject(ProjectsService);
  private auth = inject(AuthService);
  public profile: any = null;
  private router = inject(Router);
  private alertController = inject(AlertController);
  public editMode: boolean = false;
  private toastController = inject(ToastController);

  public projectsPreview = (id: number): any[] =>
    this.projectsService.getProjectsByAuthor(id);

  constructor() {
    addIcons({ logOut, close, add, pencil });
    this.profile = this.auth.getProfileInfo();
    //console.log('Profile:', this.profile);
  }

  logout() {
    this.auth.isLoggedIn = false;
    this.router.navigate(['/tabs/account/login'], {
      queryParams: { reload: true },
    }); // Add a query parameter
  }

  refreshProfile() {
    this.profile = this.profilesService.getProfilesById(this.profile.userId)[0];
    this.editMode = false;
    //console.log('Profile:', this.profile);
  }

  removeProject(projectId: number) {
    console.log('Project ID to delete:', projectId);
  }

  async confirmDeleteProject(projectId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message:
        'Are you sure you want to remove this author from the project? The project will not be deleted',

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
            this.removeProject(projectId); // Call the delete method
          },
        },
      ],
    });

    await alert.present();
  }

  editProject(projectId: number) {}

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Toast will disappear after 2 seconds
      position: 'bottom', // Position of the toast
      color: color, // Success, danger, etc.
    });

    await toast.present();
  }
}
