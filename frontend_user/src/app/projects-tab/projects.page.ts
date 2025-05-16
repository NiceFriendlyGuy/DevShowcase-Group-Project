import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import {ProjectComponent} from '../components/project/project.component';
import { ProjectsService } from '../services/projects.service';
import { ProfilesService } from '../services/profiles.service';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, HomeComponent, ProjectComponent],
})
export class ProjectsPage {
  private projectsService: ProjectsService = inject<ProjectsService>(ProjectsService);
  private profilesService: ProfilesService = inject<ProfilesService>(ProfilesService);
  public projects: any[] = [];
  
  constructor() {}

  ngOnInit() {
    this.projects= this.projectsService.getProjectsAll();
    this.getPreviewAuthors();
  }
  
  //CHANGER LE TYPE DE LA VARIABLE AUTHOR EN STRING PEUT ETRE ??
  //Peut etre renvoyer direment le profile pour le getprofilebyid car il y aura tjrs que 1 profile retourner 
  public getPreviewAuthors() {
    this.projects.forEach((project) => {
      const previewAuthors: { userId: string; name: string; surname: string }[] = [];
      project.authors.forEach((authorId: number) => {
        const profiles = this.profilesService.getProfilesById(authorId);
        const profile = Array.isArray(profiles) ? profiles[0] : profiles;
        if (profile) {
          previewAuthors.push({
            userId: profile.userId,
            name: profile.name,
            surname: profile.surname
          });
        }
      });
      project.authors = previewAuthors;
    });
  }
    
}
