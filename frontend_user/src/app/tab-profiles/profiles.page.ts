import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../components/utils/search/search.component';
import { HorizontalFilterComponent } from '../components/utils/horizontal-filter/horizontal-filter.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profiles',
  templateUrl: 'profiles.page.html',
  styleUrls: ['profiles.page.scss'],
  imports: [
    CommonModule,
    ProfileComponent,
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
  private route = inject(ActivatedRoute);
  public profileId: string = '';
  public filteredProfiles: any[] = [];

  onFilteredProfiles(filtered: any[]) {
    this.filteredProfiles = filtered;
  }

  onFilteredItems(filtered: any[]) {
    this.selectedTechnologies = filtered;
  }
  constructor() {
    this.route.queryParams.subscribe((params) => {
      console.log('Query params:', params);
      if (params['id']) {
        this.profileId = params['id'];
      }
    });
  }

  async ngOnInit() {
    this.profiles = await this.profilesService.getProfilesAll();

    if (this.profileId) {
      let profile = this.profilesService.getProfilesById(this.profileId);
      console.log('Profile by ID:', profile);
      this.filteredProfiles = profile;
    } else {
      this.filteredProfiles = this.profiles;
    }

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
