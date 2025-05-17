import { Injectable } from '@angular/core';
import dummyProjectsData from 'src/app/services/dummyData/dummyProjectsData.json'; // Import JSON file
import dummyCategoriesData from 'src/app/services/dummyData/dummyCategoriesData.json'; // Import JSON file
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  getProjectsAll(){
    return dummyProjectsData
  }

  getProjectsByAuthor(authorId: number) {
    return dummyProjectsData.filter(project => project.authors.includes(authorId));
  }

  getCategoriesAll(){
    return dummyCategoriesData;
  }

}
