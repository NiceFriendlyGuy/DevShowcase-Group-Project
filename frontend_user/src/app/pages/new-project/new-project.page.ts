import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
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
  IonDatetime,
  IonTextarea,
  IonList,
  IonButton,
  IonChip,
  IonAvatar,
  IonIcon,
} from '@ionic/angular/standalone';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProfilesService } from 'src/app/services/profiles.service';
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
  standalone: true,
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
    IonDatetime,
    IonTextarea,
    IonList,
    IonButton,
    IonChip,
    IonAvatar,
    IonIcon,
  ],
})
export class NewProjectPage implements OnInit {
  private projectService = inject(ProjectsService);
  private profilesService = inject(ProfilesService);
  projectForm!: FormGroup;
  categories: any[] = [];
  project: any = {};
  Profiles: any[] = [];
  filteredProfiles: any[] = [];
  selectedProfiles: any[] = [];
  authorsInput: string = '';
  authorsId: string[] = [];
  photos: string[] = [];

  constructor(private fb: FormBuilder) {}

  async ngOnInit() {
    this.categories = this.projectService.getCategoriesAll();
    this.projectForm = this.fb.group(
      {
        title: ['', Validators.required],
        category: ['', Validators.required],
        date: ['', Validators.required],
        description: [''],
        technologies: [''],
        authors: [''], //Voir comment faire la validation pour les auteurs
        photos: [[]],
      },
      { validators: [this.authorsValidator()] }
    );
    this.Profiles = await this.profilesService.getProfilesAll();
  }

  authorsValidator() {
    return (formGroup: FormGroup) => {
      // this.authorsId doit être accessible ici, donc bind(this) ou utiliser une closure
      return this.authorsId.length > 0 ? null : { authorsRequired: true };
    };
  }

  onSubmit() {}

  onAuthorInput(event: any) {
    this.authorsInput = event.target.value;
    this.searchFilterProfiles(this.authorsInput);
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
    console.log(this.authorsId);
  }

  selectAuthor(profile: any) {
    this.selectedProfiles.push(profile);
    this.authorsId.push(profile.id);
    this.authorsInput = '';
    this.filteredProfiles = [];
  }

  onPhotosSelected(event: any) {}
}
