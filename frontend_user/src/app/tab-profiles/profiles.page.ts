import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../components/utils/search/search.component';
import { HorizontalFilterComponent } from '../components/utils/horizontal-filter/horizontal-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

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
  public profiles: any = [];
  public searchTerm: string = '';
  public listTechnologies: any = [];
  public selectedTechnologies: any[] = [];
  private route = inject(ActivatedRoute);
  public profileId: string = '';
  public filteredProfiles: any[] = [];
  private router = inject<any>(Router);
  public noResults: boolean = false;
  public loadingData: boolean = false;

  private cdr = inject(ChangeDetectorRef);

  onFilteredProfiles(filtered: any[]) {
    this.filteredProfiles = filtered;
    if (this.filteredProfiles.length === 0 && !this.loadingData) {
      this.noResults = true;
    } else {
      this.noResults = false;
    }
  }

  onFilteredItems(filtered: any[]) {
    this.selectedTechnologies = filtered;
  }
  constructor() {}

  async ngOnInit() {
    this.loadingData = true;
    this.profiles = await this.profilesService.getProfilesAll();
    this.cdr.detectChanges();
    this.loadingData = false;

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
  onProfileClick(profileId: string) {
    this.router.navigate(['tabs/profiles/profileDetails', profileId]);
  }
}
