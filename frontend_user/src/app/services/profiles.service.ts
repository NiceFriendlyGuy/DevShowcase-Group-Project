import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private profiles: any[] = [];
  private headers = { headers: { 'Content-Type': 'application/json' } };

  // Urls
  private findAllProfilesUrl = environment.BASE_URL_PROFILES + '/findAll';
  private newProfilesUrl = environment.BASE_URL_PROFILES + '/';
  private updateProfilesUrl = environment.BASE_URL_PROFILES + '/';
  private deleteProfilesUrl = environment.BASE_URL_PROFILES + '/';

  private httpClient = inject(HttpClient);

  constructor() {}

  async ngOnInit() {
    await this.getProfilesAll();
  }

  public async getProfilesAll(): Promise<any> {
    if (environment.production) {
      const profiles = await firstValueFrom(
        this.httpClient.post(this.findAllProfilesUrl, this.headers)
      );
      if (profiles) {
        this.profiles = <any>profiles;
      } else {
        console.error('Error fetching profiles:', profiles);
      }
    } else {
      /////// Using Mock Data //////////
      console.log('Using mock data for profiles');
      // Dynamically import the dummy data only if useMockData is true
      const { default: dummyProfilesData } = await import(
        'src/app/services/dummyData/dummyProfilesData.json'
      );
      this.profiles = dummyProfilesData;
    }
    return this.profiles;
  }

  getProfilesById(authorId: string) {
    if (this.profiles.length === 0) {
      this.getProfilesAll();
    }
    return this.profiles.filter((profile) => profile.id === authorId);
  }

  async addProfile(profile: any): Promise<any> {
    //console.log('addProfile', profile);
    if (environment.production) {
      const id = await firstValueFrom(
        this.httpClient.post(this.newProfilesUrl, profile, this.headers)
      );
      console.log('Profile added with id:', id);
      if (id) {
        profile['id'] = id;
        this.profiles.push(profile);
      } else {
        console.error('Error adding profile:', id);
      }
    } else {
      /////// Using Mock Data //////////
      console.log('Using mock data for adding a profile');
      this.profiles.push(profile);
    }
    return profile;
  }

  async updateProfile(profile: any): Promise<any> {
    //console.log('updateProfile', profile);

    if (environment.production) {
      const result = await firstValueFrom(
        this.httpClient.post(
          this.updateProfilesUrl + profile.id,
          profile,
          this.headers
        )
      );
      console.log('Profile updated:', result);
      if (result) {
        this.profiles.push(result);
        return profile;
      } else {
        console.error('Error adding profile:', result);
        return null;
      }
    } else {
      /////// Using Mock Data //////////
      console.log('Using mock data for adding a profile');
      const index = this.profiles.findIndex(
        (profileToUpdate) => profileToUpdate.id === profile.id
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
  }

  async deleteProfile(id: string): Promise<boolean> {
    if (environment.production) {
      const result = await firstValueFrom(
        this.httpClient.delete(this.deleteProfilesUrl + id, this.headers)
      );
      if (result) {
        console.log('Profile deleted:', result);
        return true;
      } else {
        console.error('Error deleting profile:', result);
        return false;
      }
    } else {
      /////// Using Mock Data //////////
      console.log('Using mock data for deleting a profile');
      const index = this.profiles.findIndex((profile) => profile.id === id);
      if (index !== -1) {
        this.profiles.splice(index, 1);
        return true;
      }
      return false;
    }
  }

  async authProfile(email: string, password: string) {
    if (this.profiles.length === 0) {
      await this.getProfilesAll();
    }
    const profile = this.profiles.find(
      (profile) => profile.email === email && profile.password === password
    );
    if (profile) {
      return profile;
    } else {
      return null;
    }
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

  changePassword(id: string, data: any) {
    const { currentPassword, newPassword } = data;
    const profile = this.profiles.find((profile) => profile.id === id);
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

  getPreviewProfile(profiles: string[]): any[] {
    const authorsPreview: any[] = [];
    profiles.forEach((authorId: string) => {
      const foundProfile = this.getProfilesById(authorId);
      const profile = Array.isArray(foundProfile)
        ? foundProfile[0]
        : foundProfile;
      if (profile) {
        authorsPreview.push({
          id: profile.id,
          name: profile.name,
          surname: profile.surname,
          photo: profile.photo,
        });
      }
    });
    return authorsPreview;
  }
}
