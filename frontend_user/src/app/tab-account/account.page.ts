import { Component, inject, ViewChild } from '@angular/core';
import {
  IonCard,
  IonFab,
  IonFabButton,
  IonContent,
  IonIcon,
  IonLabel,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfilesService } from '../services/profiles.service';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { logOut, close, add, pencil } from 'ionicons/icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../services/projects.service';
import { ContactAdminComponent } from '../components/contact-admin/contact-admin.component';
@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
  imports: [
    CommonModule,
    IonFab,
    IonFabButton,
    IonCard,
    IonContent,
    IonIcon,
    IonLabel,
    ProfileComponent,
    ContactAdminComponent,
  ],
})
export class AccountPage {
  private profilesService = inject(ProfilesService);
  private projectsService = inject(ProjectsService);
  private auth = inject(AuthService);
  public profile: any = null;
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  public projectsPreview = (id: string): any[] =>
    this.projectsService.getProjectsByAuthor(id);

  constructor() {
    addIcons({ logOut, close, add, pencil });
    //console.log('Profile:', this.profile);
  }

  async ngOnInit() {
    this.profile = this.auth.getProfileInfo();
  }

  logout() {
    this.auth.isLoggedIn = false;
    this.router.navigate(['/tabs/account/login'], {
      queryParams: { reload: true },
    }); // Add a query parameter
  }

  async refreshProfile() {
    this.profile = await this.profilesService.getProfilesById(this.profile.id);
    //console.log('Profile:', this.profile);
  }

  async removeProject(projectId: string, isOnlyAuthor: boolean) {
    if (isOnlyAuthor) {
      await this.projectsService.removeProject(projectId);
    } else {
      await this.projectsService.removeAuthorFromProject(
        projectId,
        this.profile.id
      );
    }
  }

  async confirmDeleteProject(projectId: string) {
    let project = await this.projectsService.getProjectById(projectId);
    let warning = '';
    let isOnlyAuthor = false;
    if (project[0].authors.length === 1) {
      isOnlyAuthor = true;
      warning =
        'You are the only author of this project. Deleting it will remove it permanently.';
    } else {
      isOnlyAuthor = false;
      warning =
        'You are going to be removed form this project. The project will not be deleted.';
    }
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message:
        'Are you sure you want to remove this author from the project? ' +
        warning,

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
            this.removeProject(projectId, isOnlyAuthor); // Call the delete method
          },
        },
      ],
    });

    await alert.present();
  }

  editProject(projectId: string) {
    this.router.navigate(['/tabs/account/editProject', projectId]);
  }

  newProject() {
    this.router.navigate(['/tabs/account/newProject']);
  }

  async handleAdminMessage(event: { category: string; message: string }) {
    // Envoyer au backend ou afficher une notification
    console.log('Message to admin:', event);
    let result = await this.profilesService.sendAdminMessage(
      event.category,
      event.message
    );
    const toast = await this.toastController.create({
      message: <any>result,
      duration: 2000,
    });
    toast.present();
  }

  goEditProfile() {
    this.router.navigate(['/tabs/account/editProfile']);
  }
}
