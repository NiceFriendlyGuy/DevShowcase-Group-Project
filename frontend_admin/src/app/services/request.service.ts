import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../models/request.model';
import { environment } from '../environement';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly http = inject(HttpClient);
  private requestsUrl = environment.BASE_URL + '/api/requests/findAll';

  public getRequests(): Observable<Request[]> {
    return this.http.post<Request[]>(this.requestsUrl, {});
  }
}
