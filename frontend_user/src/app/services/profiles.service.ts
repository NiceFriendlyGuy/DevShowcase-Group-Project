import { Injectable } from '@angular/core';
import dummyProfilesData from 'src/app/services/dummyData/dummyProfilesData.json'; // Import JSON file

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private profiles: any[] = [];

  constructor() {
    // Initialize profiles with dummy data
    this.profiles = dummyProfilesData;
  }

  getProfilesAll() {
    return this.profiles;
  }

  getProfilesById(authorId: number) {
    return this.profiles.filter((profile) => profile.userId === authorId);
  }

  addProfile(profile: any) {
    console.log('addProfile', profile);
    this.profiles.push(profile);
    return profile;
  }

  updateProfile(profile: any) {
    console.log('updateProfile', profile);

    const index = this.profiles.findIndex(
      (profileToUpdate) => profileToUpdate.userId === profile.userId
    );
    if (index !== -1) {
      for (const key in profile) {
        if (profile.hasOwnProperty(key)) {
          this.profiles[index][key] = profile[key]; // Update the field
        }
      }
      return this.profiles[index];
    }
    return null;
  }

  authProfile(email: string, password: string) {
    const profile = this.profiles.find(
      (profile) => profile.email === email && profile.password === password
    );
    if (profile) {
      return profile;
    } else {
      return null;
    }
  }

  deleteProfile(id: number) {
    const index = this.profiles.findIndex((profile) => profile.userId === id);
    if (index !== -1) {
      this.profiles.splice(index, 1);
      return true;
    }
    return false;
  }

  getTechnologiesFromUsers() {
    const allTechnologies: any[] = [];
    this.profiles.forEach((profile) => {
      if (profile.technologies) {
        profile.technologies.forEach((tech: any) => {
          if (!allTechnologies.some((t: any) => t.name === tech.name)) {
            allTechnologies.push(tech);
          }
        });
      }
    });
    return allTechnologies;
  }

  changePassword(userId: string, data: any) {
    const { currentPassword, newPassword } = data;
    const profile = this.profiles.find((profile) => profile.userId === userId);
    if (profile) {
      if (profile.password === currentPassword) {
        profile.password = newPassword;
        return true; // Password changed successfully
      } else {
        return false; // Current password is incorrect
      }
    }
    return false; // Profile not found
  }
}
