import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfoSubject = new BehaviorSubject<any>(null); // Holds user information
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);  

  constructor() { }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
  set isLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  async authUser(email: string, password: string): Promise<any> {
    //const result: any = await this.studentService.authUser(email,password);
    let result = null;
    if (password == '1234') {
      this.isLoggedInSubject.next(true);
      result = {
        student: {
          id: 1,
          email: email,
          password: password,
          given_name: "Antonio",
          family_name: "Gonzalez",
          picture: "https://randomuser.me/api/portraits/men/1.jpg"
        }
      };
    }
      else {
        result = {
          message: "Invalid credentials"
        };
      }
    
    return result; // Return the student object if authentication is successful


  }
}
