import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProfilesService } from './profiles.service'; // Import the ProfileService
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfoSubject = new BehaviorSubject<any>(null); // Holds user information
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);  
  private profileService = inject(ProfilesService); // Inject the ProfileService

  constructor() { }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
  set isLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  async authUser(email: string, password: string): Promise<any> {
    const result: any = await this.profileService.authProfile(email,password);
    if (result) {
      this.isLoggedInSubject.next(true);
    }
    
    return result; // Return the profile object if authentication is successful
  }

  setProfileInfo(userInfo: any): void {
    this.userInfoSubject.next(userInfo);
  }
  getProfileInfo(): any {
    return this.userInfoSubject.value;
  }
}
