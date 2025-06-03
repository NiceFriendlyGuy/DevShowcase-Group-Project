import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../models/request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly http = inject(HttpClient);
  private requestsUrl = 'assets/requests.json';

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.requestsUrl);
  }
}
