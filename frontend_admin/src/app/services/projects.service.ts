// services/project.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/api/projects/findAll';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.post<Project[]>(
      'http://localhost:3000/api/projects/findAll',
      {},
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );  
  }
}
