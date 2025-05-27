import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea, IonList, IonButton } from '@ionic/angular/standalone';
import { ProjectsService } from 'src/app/services/projects.service';
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, CommonModule, FormsModule,
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
})
export class NewProjectPage implements OnInit {
  private projectService = inject(ProjectsService);
  projectForm!: FormGroup;
  categories: any[] = [];
  filteredProfiles: any[] = [];
  authorsInput: string = '';
  photos: string[] = [];

  constructor(private fb: FormBuilder) { console.log('NewProjectPage constructor'); }

  ngOnInit() {
    this.categories = this.projectService.getCategoriesAll();
    console.log('Categories:', this.categories);
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      description: [''],
      technologies: [''],
      authors: [''],
      photos: [[]]
    });
  }

  onSubmit() {}

  onAuthorInput(event: any){}

  selectAuthor(profile: any){}

  onPhotosSelected(event: any) {}
}
