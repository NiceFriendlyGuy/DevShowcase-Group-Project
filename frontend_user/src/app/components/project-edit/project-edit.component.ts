import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea, IonList, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonTextarea,
    IonList,
    IonButton
  ],
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent  implements OnInit {
  projectForm!: FormGroup;
  categories: string[] = [];
  filteredProfiles: any[] = [];
  authorsInput: string = '';
  photos: string[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {}

  onSubmit() {}

  onAuthorInput(event: any){}

  selectAuthor(profile: any){}

  onPhotosSelected(event: any) {}

}
