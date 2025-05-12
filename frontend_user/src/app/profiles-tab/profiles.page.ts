import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput} from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProfileComponent } from '../components/profile/profile.component'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profiles',
  templateUrl: 'profiles.page.html',
  styleUrls: ['profiles.page.scss'],
  imports: [ProfileComponent, IonHeader, IonToolbar, IonTitle, IonContent,IonItem, IonInput, FormsModule]
})
export class ProfilesPage {
  private profilesService: ProfilesService = inject<ProfilesService>(ProfilesService);
  public profiles: any[] = [];
  public searchTerm: string = '';
  public filteredProfiles: any[]  = [];

  constructor() {}
  ngOnInit() {
    this.profiles= this.profilesService.getProfilesAll();
    this.updateFilteredProfiles();
  }

  public filterProfiles() {
    if (this.searchTerm.length === 0) {
      return this.profiles;
    }
    const lowerCaseTerm: any[]= this.searchTerm.toLowerCase().split(' ');
    console.log(lowerCaseTerm);
    return this.profiles.filter(profile => {
      let match = false;
      for (let term of lowerCaseTerm) {
        if (term.length > 0) {
          match = match || (
            profile.name.toLowerCase().includes(term) ||
            profile.surname.toLowerCase().includes(term) ||
            profile.email.toLowerCase().includes(term) ||
            profile.bio.toLowerCase().includes(term) ||
            profile.technologies?.some((item: any) => item.name.toLowerCase().includes(term))

            
          );
        }
      }
      return match;
    });
  }

  public updateFilteredProfiles() {
    this.filteredProfiles = this.filterProfiles();
  }
}
