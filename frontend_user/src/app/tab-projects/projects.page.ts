import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectComponent } from '../components/project/project.component';
import { ProjectsService } from '../services/projects.service';
import { ProfilesService } from '../services/profiles.service';
import { SearchComponent } from '../components/utils/search/search.component';
import { HorizontalFilterComponent } from '../components/utils/horizontal-filter/horizontal-filter.component';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss'],
  imports: [
    IonContent,
    CommonModule,
    ProjectComponent,

    SearchComponent,
    HorizontalFilterComponent,
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

  onFilteredProjects(filtered: any[]) {
    console.log('Filtered projects:', filtered);
    this.filteredProjects = filtered;
  }

  onFilteredItems(filtered: any[]) {
    console.log('Filtered items:', filtered);
    this.selectedCategories = filtered;
  }

  constructor() {}

  async ngOnInit() {
    await this.profilesService.getProfilesAll();
    this.projects = await this.projectsService.getProjectsAll();
    this.filteredProjects = this.projects;
    this.categories = this.projectsService.getCategoriesAll();
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

  clearFilters() {
    this.selectedCategories = [];
    this.filteredProjects = this.projects;
  }

  isSelected(cat: any): boolean {
    return this.selectedCategories.includes(cat);
  }

  showProject(projectId: string) {
    this.router.navigate(['tabs/projects/projectDetails', projectId]);
  }
}
