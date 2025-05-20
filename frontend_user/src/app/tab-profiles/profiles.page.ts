import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonItem,
} from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../components/utils/search/search.component';

@Component({
  selector: 'app-profiles',
  templateUrl: 'profiles.page.html',
  styleUrls: ['profiles.page.scss'],
  imports: [
    ProfileComponent,
    IonHeader,
    IonToolbar,
    IonItem,
    IonTitle,
    IonContent,
    IonIcon,
    FormsModule,
    SearchComponent,
  ],
})
export class ProfilesPage {
  private profilesService: ProfilesService =
    inject<ProfilesService>(ProfilesService);
  public profiles: any[] = [];
  public searchTerm: string = '';
  public listTechnologies: any = [];
  public selectedTechnologies: any[] = [];

  public filteredProfiles: any[] = [];

  onFilteredProfiles(filtered: any[]) {
    this.filteredProfiles = filtered;
  }
  constructor() {}
  ngOnInit() {
    this.profiles = this.profilesService.getProfilesAll();
    this.listTechnologies = this.profilesService
      .getTechnologiesFromUsers()
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
    //this.updateFilteredProfiles();
  }

  ////////////////////////  Filters ///////////////////////////////////
  toggleTech(tech: any) {
    const index = this.selectedTechnologies.indexOf(tech);
    if (index > -1) {
      // Remove
      this.selectedTechnologies = [
        ...this.selectedTechnologies.slice(0, index),
        ...this.selectedTechnologies.slice(index + 1),
      ];
    } else {
      // Add
      this.selectedTechnologies = [...this.selectedTechnologies, tech];
    }
    //this.updateFilteredProfiles();
  }

  public isSelected(tech: any): boolean {
    return this.selectedTechnologies.includes(tech);
  }

  getIconUrl(skillName: string): string {
    const baseUrl =
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
    const primaryUrl = `${baseUrl}${skillName
      .toLowerCase()
      .replace('.', '')}/${skillName
      .toLowerCase()
      .replace('.', '')}-original.svg`;
    return primaryUrl;
  }
}
