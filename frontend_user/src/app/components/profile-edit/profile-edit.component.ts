import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ModalController, IonCard, IonAvatar, IonChip, IonIcon, IonLabel, IonImg, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonFooter, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea } from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { addIcons } from 'ionicons';
import { close, add, pencil } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { ChangePasswordComponent } from '../change-password/change-password.component';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  imports: [CommonModule,FormsModule,RouterLink, ReactiveFormsModule, IonTextarea, IonAvatar, IonCard, IonChip, IonIcon, IonLabel,  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonImg, IonItem, IonFooter, IonButton, IonInput, IonLabel, IonSelect, IonSelectOption],

})
export class ProfileEditComponent implements OnInit {


  @Input() profile: any;
  @Output() cancelEdit = new EventEmitter<void>(); // Event emitter to notify the parent
  @Output() doneEdit = new EventEmitter<void>(); // Event emitter to notify the parent

  public profileForm: FormGroup;
  private router = inject(Router);
  private profilesService = inject(ProfilesService);
  private projectsService = inject(ProjectsService);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  public avatarPreview: string | ArrayBuffer | null = null;
  public techName: string = '';
  public techVersion: string = '';
  public techIconUrl: string = '';
  private alertController = inject(AlertController);
  private modalController = inject(ModalController);
  private toastController = inject(ToastController);

  public projectsPreview = (id: number): any[] => 
    this.projectsService.getProjectsByAuthor(id);

constructor() {
        addIcons({ close, add, pencil });

    this.profileForm = this.fb.group({
      userId: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      role: [''],
      email: ['', [Validators.email]],
      phone: ['' ],
      bio: [''],
      technologies: this.fb.array([]), // Initialize as a FormArray
      techName: ['' ],
      techVersion: [''],
    });
  }

  ngOnInit() {
    this.profileForm.patchValue({
      userId: this.profile?.userId, 
      name: this.profile?.name,
      surname: this.profile?.surname,
      role: this.profile?.role,
      email: this.profile?.email,
      phone: this.profile?.phone,
      bio: this.profile?.bio,
    });
    // Populate the technologies FormArray
    const technologiesArray = this.profile?.technologies || [];
    technologiesArray.forEach((tech: any) => {
      const technologies = this.profileForm.get('technologies') as FormArray;
      technologies.push(
        this.fb.group({
          name: [tech.name || '', Validators.required],
          version: [tech.version || ''],
        })
      );
    });

  }

  async openChangePasswordModal() {
    const modal = await this.modalController.create({
      component: ChangePasswordComponent,
    });

    await modal.present();

    // Retrieve data when the modal is dismissed
    const { data } = await modal.onDidDismiss();
    if (data && typeof data  === 'object') {
      const result = this.profilesService.changePassword(this.profile.userId, data);
      if (result) {
        // Handle successful password change
        console.log('Password changed successfully');
        this.presentToast('Password changed successfully!', 'success');

      } else {
        // Handle password change failure
        console.log('Failed to change password');
        this.presentToast('Failed to change password', 'danger');
      }
    }
    else if (data && typeof data === 'string') {
      // Handle modal dismissal with error
      console.log(data);
      this.presentToast(data, 'danger');
    }
    else {
      // Handle modal dismissal without data
      console.log('Cancelled password change');
      this.presentToast('Cancelled password change', 'warning');
    }
  }

  get technologies(): FormArray {
    return this.profileForm.get('technologies') as FormArray;
  }

  createTechnologyGroup(tech: any): FormGroup {
    return this.fb.group({
      name: [tech.name || '', Validators.required],
      version: [tech.version || '']
    });
  }

    onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.avatarPreview = reader.result; // Preview the selected image
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formValue = { ...this.profileForm.value }; // Create a copy of the form value
      delete formValue.techName; // Remove techName
      delete formValue.techVersion; // Remove techVersion (if needed)

      console.log('Updated Profile:', formValue);

      this.profilesService.updateProfile(formValue)
      this.doneEdit.emit(); // Emit the cancel event to the parent

    } else {
      console.log('Invalid form data');
    }
  }

  onCancel() {
    this.cancelEdit.emit(); // Emit the cancel event to the parent
  }

  getIconUrl(skillName: string): string {
    const baseUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
    const primaryUrl = `${baseUrl}${skillName.toLowerCase().replace('.','')}/${skillName.toLowerCase().replace('.','')}-original.svg`;
    return primaryUrl;
  }

  removeTech(index: number) {
    const technologies = this.profileForm.get('technologies') as FormArray;
    technologies.removeAt(index);
  }

   addTech() {
    const technologies = this.profileForm.get('technologies') as FormArray;
    technologies.push(
      this.fb.group({
        name: [this.profileForm.value.techName || '', Validators.required],
        version: [this.profileForm.value.techVersion || ''],
      })
    );
  }
 
  async checkUrlExists(){
    let url = this.getIconUrl(this.profileForm.value.techName);
    if (this.profileForm.value.techName === '') {
      this.techIconUrl = 'assets/icon/favicon.png'; // Default icon URL
      return;
    }

    await this.http.head(url).toPromise().then(
      (response) => {
        this.techIconUrl = url; // Store the response data
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Suppress the error log for 403 Forbidden
          console.log('tech "', this.profileForm.value.techName, '" does not exist. Please try again.');
            //this.techIconUrl = 'assets/icon/favicon.png';

        }
        else {
          // Log other errors for debugging purposes
          console.error('Error fetching URL:', error);
        }
      }
    );
  }

  removeProject(projectId: number) {
    console.log('Project ID to delete:', projectId);
  }

  async confirmDeleteProject(projectId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this project?',
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


  editProject(projectId: number) {

  }

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
