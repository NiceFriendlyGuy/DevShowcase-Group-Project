import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectComponent } from '../components/project/project.component';
import { ProjectsService } from '../services/projects.service';
import { ProfilesService } from '../services/profiles.service';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    ProjectComponent,
  ],
})
export class ProjectsPage {
  private router = inject(Router);
  private projectsService: ProjectsService =
    inject<ProjectsService>(ProjectsService);
  private profilesService: ProfilesService =
    inject<ProfilesService>(ProfilesService);
  public projects: any[] = [];
  public filteredProjects: any[] = [];
  public categories: any[] = [];
  public selectedCategories: any[] = [];

  constructor() {}

  ngOnInit() {
    this.projects = this.projectsService.getProjectsAll();
    this.filteredProjects = this.projects;
    this.categories = this.projectsService.getCategoriesAll();
    this.getPreviewAuthors();
  }
  ////// Filtre Categories //////

  toggleTech(cat: any) {
    const index = this.selectedCategories.indexOf(cat);
    if (index > -1) {
      // Déjà sélectionné → on le retire
      this.selectedCategories.splice(index, 1);
      this.updateFilteredProjects();
      //faire la recherche pour actualiser filteredProjects
    } else {
      // Pas encore sélectionné → on l'ajoute
      this.selectedCategories.push(cat);
      this.updateFilteredProjects();
      //faire la recherche pour actualiser filteredProjects
    }
  }

  updateFilteredProjects() {
    if (this.selectedCategories.length === 0) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter((project) => {
        return this.selectedCategories.some(
          (cat: any) => cat.name === project.category
        );
      });
    }
  }

  isSelected(cat: any): boolean {
    return this.selectedCategories.includes(cat);
  }

  //CHANGER LE TYPE DE LA VARIABLE AUTHOR EN STRING PEUT ETRE ??
  //Peut etre renvoyer direment le profile pour le getprofilebyid car il y aura tjrs que 1 profile retourner
  public getPreviewAuthors() {
    this.projects.forEach((project) => {
      const previewAuthors: {
        id: string;
        name: string;
        surname: string;
      }[] = [];
      project.authors.forEach((id: string) => {
        const profiles = this.profilesService.getProfilesById(id);
        const profile = Array.isArray(profiles) ? profiles[0] : profiles;
        if (profile) {
          previewAuthors.push({
            id: profile.id,
            name: profile.name,
            surname: profile.surname,
          });
        }
      });
      project.authors = previewAuthors;
    });
  }

  showProject(id: string) {
    this.router.navigate(['tabs/projects/projectDetails', id]);
  }
}
