import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this.http.post<User[]>(
      'http://localhost:3000/api/profiles/findAll',
      {},
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `http://localhost:3000/api/profiles/${user._id}`,
      user,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  /* public deleteUser(user: User): Observable<User[]> {
    return this.http.delete<User[]>('assets/fakeusers.json', { body: user });
  } */

  public deleteUser(users: User[], userToDelete: User): Observable<User[]> {
    const updatedUsers = users.filter((user) => user !== userToDelete);
    return of(updatedUsers);
  }
}
