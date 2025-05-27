import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfilesService } from './profiles.service'; // Import the ProfileService
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfoSubject = new BehaviorSubject<any>(null); // Holds user information
  public profile$ = this.userInfoSubject.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private profileService = inject(ProfilesService); // Inject the ProfileService
  private isSignUpSubject = new BehaviorSubject<boolean>(false);
  public enabledSignUp$ = this.isSignUpSubject.asObservable();

  constructor() {}

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
  set isLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  get isSignUp(): boolean {
    return this.isSignUpSubject.value;
  }
  set isSignUp(value: boolean) {
    this.isSignUpSubject.next(value);
  }

  async authUser(email: string, password: string): Promise<any> {
    const result: any = await this.profileService.authProfile(email, password);
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
