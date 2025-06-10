import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../environement';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this.http.post<User[]>(
      environment.BASE_URL + '/profiles/findAll',
      {},
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      environment.BASE_URL + `/profiles/${user._id}`,
      user,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  public updateUserPassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put(
      environment.BASE_URL + `/auth/changePassword/${userId}`,
      {
        currentPassword,
        newPassword,
      }
    );
  }

  public deleteUserById(userId: string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/profiles/${userId}`);
  }
}
