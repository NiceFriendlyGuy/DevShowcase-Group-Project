import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../components/utils/search/search.component';
import { HorizontalFilterComponent } from '../components/utils/horizontal-filter/horizontal-filter.component';

@Component({
  selector: 'app-profiles',
  templateUrl: 'profiles.page.html',
  styleUrls: ['profiles.page.scss'],
  imports: [
    ProfileComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    SearchComponent,
    HorizontalFilterComponent,
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

  onFilteredItems(filtered: any[]) {
    this.selectedTechnologies = filtered;

    console.log('Selected technologies:', this.selectedTechnologies);
  }
  constructor() {}
  ngOnInit() {
    this.profiles = this.profilesService.getProfilesAll();

    let technologiesNames: any[] = this.profilesService
      .getTechnologiesFromUsers()
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    this.listTechnologies = technologiesNames.map((item: any) => {
      return {
        name: item.name,
        src: this.getIconUrl(item.name),
      };
    });
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
