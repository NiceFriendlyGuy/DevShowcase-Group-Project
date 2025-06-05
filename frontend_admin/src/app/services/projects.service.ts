// services/project.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/projects.model';
import { environment } from '../environement';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.BASE_URL + '/api/projects/findAll';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.post<Project[]>(
      environment.BASE_URL + '/api/projects/findAll',
      {},
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );  
  }
}
