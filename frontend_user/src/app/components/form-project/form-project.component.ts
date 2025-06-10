import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormsModule } from '@angular/forms';
import { IonContent, IonFabButton, IonHeader } from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonList,
  IonButton,
  IonChip,
  IonAvatar,
  IonIcon,
  IonToast,
  IonFab,
} from '@ionic/angular/standalone';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonList,
    IonButton,
    IonChip,
    IonAvatar,
    IonIcon,
    IonToast,
    IonFab,
    IonFabButton,
  ],
})
export class FormProjectComponent implements OnInit {
  @Input() project: any;
  @Output() formSubmitted = new EventEmitter<Project>();
  private router = inject(Router);

  pageTitle = '';
  private projectService = inject(ProjectsService);
  private profilesService = inject(ProfilesService);
  projectForm!: FormGroup;
  private fb = inject(FormBuilder);

  categories: any[] = [];

  Profiles: any[] = [];
  filteredProfiles: any[] = [];
  selectedProfiles: any[] = [];
  authorsInput: string = '';
  authorsId: string[] = [];

  photos: any[] = [];

  http = inject(HttpClient);
  techFound = false;
  techIconUrl: string = '';
  technologies: any[] = [];

  isToastOpen = false;
  messageToast = '';
  colorToast = '';
  isNew: boolean = true;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.categories = this.projectService.getCategoriesAll();
    this.projectForm = this.fb.group(
      {
        title: ['', Validators.required],
        category: ['', Validators.required],
        date: ['', Validators.required],
        description: [''],
        link: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i
            ),
          ],
        ],
        techName: [''],
        techVersion: [''],
        authors: [''], //voir comment faire la validation
        photos: [[]],
      },
      { validators: [this.othersValidators()] }
    );
    this.Profiles = await this.profilesService.getProfilesAll();
    if (this.project) {
      this.chargeProject();
      this.isNew = false;
    }
  }

  othersValidators() {
    return (formGroup: FormGroup) => {
      const errors: any = {};

      //validation Date
      const dateValue = formGroup.get('date')?.value;
      if (dateValue) {
        const inputDate = new Date(dateValue);
        const today = new Date();

        // Réinitialiser heures/minutes/secondes pour comparaison uniquement sur la date
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (inputDate > today) {
          errors.futureDateNotAllowed = true;
        }
      }

      // Validation auteurs
      if (!this.authorsId || this.authorsId.length === 0) {
        errors.authorsRequired = true;
      }

      // Validation technologies
      if (!this.technologies || this.technologies.length === 0) {
        errors.technologiesRequired = true;
      }

      if (this.photos.length === 0) {
        errors.photosRequired = true;
      }

      // Validation Photos

      // S'il y a des erreurs, on les retourne, sinon null
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  chargeProject() {
    const dateOnly = this.project.date
      ? this.project.date.substring(0, 10)
      : '';
    this.pageTitle = 'Edit Project';
    this.projectForm.patchValue({
      title: this.project.title,
      category: this.project.category,
      date: dateOnly,
      description: this.project.description,
      link: this.project.link,
    });
    this.photos = [...this.project.photos];
    this.chargeAuthors();
    this.technologies = [...this.project.technologies];
  }

  chargeAuthors() {
    for (let i = 0; i < this.project.authors.length; i++) {
      const authorId = this.project.authors[i];
      const profile = this.Profiles.find((p) => p.id === authorId);
      if (profile) {
        this.selectedProfiles.push(profile);
        this.authorsId.push(profile.id);
      }
    }
  }

  getIconUrl(skillName: string): string {
    const baseUrl =
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
    const primaryUrl = `${baseUrl}${skillName
      .toLowerCase()
      .replace('.', '')}/${skillName
      .toLowerCase()
      .replace('.', '')}-original.svg`;
    return primaryUrl;
  }

  async checkUrlExists() {
    let url = this.getIconUrl(this.projectForm.value.techName);
    if (this.projectForm.value.techName === '') {
      this.techFound = false;
      this.techIconUrl = '';
      return;
    }

    await this.http
      .head(url)
      .toPromise()
      .then(
        (response) => {
          this.techFound = true;
          this.techIconUrl = url; // Store the response data
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            // Suppress the error log for 403 Forbidden
            this.techFound = false;
            this.techIconUrl = '';
          } else {
            // Log other errors for debugging purposes
            this.techFound = false;
            this.techIconUrl = '';
            console.error('Error fetching URL:', error);
          }
        }
      );
  }

  addTech() {
    const nameTech = this.projectForm.value.techName;
    const versionTech = this.projectForm.value.techVersion;

    if (!nameTech || nameTech.trim() === '') {
      this.messageToast = 'Technology name cannot be empty.';
      this.colorToast = 'danger';
      this.setOpen(true);
      return;
    }
    if (this.techFound) {
      const exist = this.technologies.some(
        (tech) =>
          tech.name.toLowerCase().trim() === nameTech.toLowerCase().trim() &&
          (tech.version?.toString().toLowerCase().trim() || '') ===
            (versionTech?.toLowerCase().trim() || '')
      );
      if (!exist) {
        this.technologies.push({
          name: nameTech,
          version: versionTech,
        });
        this.projectForm.patchValue({ techName: '', techVersion: '' });
        this.techIconUrl = '';
        this.projectForm.updateValueAndValidity(); // Recalcule les erreurs
      } else {
        this.messageToast = 'Technology already exists in the list.';
        this.colorToast = 'danger';
        this.setOpen(true);
      }
    } else {
      this.messageToast = 'Technology is not found';
      this.colorToast = 'danger';
      this.setOpen(true);
    }
  }

  removeTech(tech: any) {
    this.technologies = this.technologies.filter(
      (sel) => sel.name !== tech.name
    );
    this.projectForm.updateValueAndValidity(); // Recalcule les erreurs
  }

  onAuthorInput(event: any) {
    this.authorsInput = event.target.value;
    this.searchFilterProfiles(this.authorsInput);
    console.log(this.authorsId);
  }

  searchFilterProfiles(textSearch: string) {
    if (this.authorsInput.length < 1) {
      this.filteredProfiles = [];
    } else {
      this.filteredProfiles = this.Profiles.filter(
        (profile) =>
          (profile.name
            .toLowerCase()
            .startsWith(this.authorsInput.toLocaleLowerCase()) ||
            profile.surname
              .toLowerCase()
              .startsWith(this.authorsInput.toLocaleLowerCase())) &&
          !this.selectedProfiles.some((sel) => sel.id === profile.id)
      );
    }
  }

  removeAuthor(profile: any) {
    this.selectedProfiles = this.selectedProfiles.filter(
      (sel) => sel.id !== profile.id
    );
    this.authorsId = this.authorsId.filter((id) => id !== profile.id);
    this.searchFilterProfiles(this.authorsInput);
    this.projectForm.updateValueAndValidity(); // Recalcule les erreurs
  }

  selectAuthor(profile: any) {
    this.selectedProfiles.push(profile);
    this.authorsId.push(profile.id);
    this.authorsInput = '';
    this.filteredProfiles = [];
    this.projectForm.patchValue({ autors: '' });
    this.projectForm.updateValueAndValidity(); // Recalcule les erreurs
  }

  async onPhotosSelected(event: any) {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos.push(e.target.result); // base64
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(url: string) {}

  //Faire les requêtes necessaires
  async onSubmit() {
    const newProjectData = {
      id: '',
      title: this.projectForm.get('title')?.value,
      category: this.projectForm.get('category')?.value,
      date: this.projectForm.get('date')?.value,
      description: this.projectForm.get('description')?.value,
      technologies: this.technologies,
      authors: this.authorsId,
      link: this.projectForm.get('link')?.value,
      photos: this.photos,
    };
    //Enregistre le project
    if (this.isNew) {
      const response = await this.projectService.createProject(newProjectData);
      console.log(response);
      //tester la response quand cela fonction afficher toast en fonction
      //Faire requete création
      this.messageToast = 'Project created successfully.';
      this.colorToast = 'success';
      this.setOpen(true);
      /*
      this.messageToast = 'Failed to create the project. Please try again.';
      this.colorToast = 'danger';
      this.setOpen(true);
      */
    } else {
      newProjectData.id = this.project.id;
      this.messageToast = 'Project updated successfully.';
      this.colorToast = 'success';
      this.setOpen(true);

      /*
      this.messageToast = 'Failed to update the project. Please try again.';
      this.colorToast = 'sucess';
      this.setOpen(true);
      */
    }
    console.log(newProjectData);
  }

  onCancel() {
    this.router.navigate(['/tabs/account']); // Navigate back to the account page
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
