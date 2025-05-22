import { inject, Injectable } from '@angular/core';
import dummyProjectsData from 'src/app/services/dummyData/dummyProjectsData.json'; // Import JSON file
import dummyCategoriesData from 'src/app/services/dummyData/dummyCategoriesData.json'; // Import JSON file
import { ProfilesService } from './profiles.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private profilesService = inject(ProfilesService);
  private projects: any[] = [];
  private categories: any[] = [];
  constructor() {
    this.projects = dummyProjectsData;
    this.categories = dummyCategoriesData;
  }

  async getProjectsAll () : Promise<any> {
    return this.projects;
  }

  getProjectById(id: string) {
    const project = this.projects.filter((project) => project.id === id);
    return project;
  }

  getProjectsByAuthor(authorId: string) {
    return this.projects.filter((project) =>
      project.authors.includes(authorId)
    );
  }

  getCategoriesAll() {
    return this.categories;
  }
}
