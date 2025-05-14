import { Injectable } from '@angular/core';
import dummyProfilesData from 'src/app/services/dummyData/dummyProfilesData.json'; // Import JSON file

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private profiles: any[] = [];

  constructor() { 
    // Initialize profiles with dummy data
    this.profiles = dummyProfilesData;
  }

  getProfilesAll(){
    return this.profiles;
  }

  getProfilesById(authorId: number) {
    return this.profiles.filter(profile => profile.userId === authorId);
  }

  addProfile(profile: any) {
    console.log('addProfile', profile);
    this.profiles.push(profile);
    return profile;
  }

  authProfile(email: string, password: string) {
    const profile = this.profiles.find(profile => profile.email === email && profile.password === password);
    if (profile) {
      return profile;
    } else {
      return null;
    }
  }

  deleteProfile(id: number) {
    const index = this.profiles.findIndex(profile => profile.userId === id);
    if (index !== -1) {
      this.profiles.splice(index, 1);
      return true;
    }
    return false;
  }

}