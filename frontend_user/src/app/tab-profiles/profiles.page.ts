import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonIcon} from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProfileComponent } from '../components/profile/profile.component'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profiles',
  templateUrl: 'profiles.page.html',
  styleUrls: ['profiles.page.scss'],
  imports: [ProfileComponent, IonHeader, IonToolbar, IonTitle, IonContent,IonItem, IonInput, IonIcon, FormsModule]
})
export class ProfilesPage {
  private profilesService: ProfilesService = inject<ProfilesService>(ProfilesService);
  public profiles: any[] = [];
  public searchTerm: string = '';
  public filteredProfiles: any[]  = [];
  public listTechnologies: any = [];
  public selectedTechnologies: any[] = [];


  constructor() {}
  ngOnInit() {
    this.profiles= this.profilesService.getProfilesAll();
    this.listTechnologies = this.profilesService.getTechnologiesFromUsers().sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.updateFilteredProfiles();
  }

  public filterProfiles() {
    if (this.searchTerm.length === 0 && this.selectedTechnologies.length === 0) {
      return this.profiles;
    }
    const lowerCaseTerm: any[]= this.searchTerm.toLowerCase().split(' ');
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
      if (this.selectedTechnologies.length > 0) {
        match = match || this.selectedTechnologies.some((tech: any) => profile.technologies?.some((item: any) => item.name === tech.name));
      }
      return match;
    });
  }

  public updateFilteredProfiles() {
    this.filteredProfiles = this.filterProfiles();
  }

////////////////////////  Filters ///////////////////////////////////
  toggleTech(tech: any) {
    const index = this.selectedTechnologies.indexOf(tech);
    if (index > -1) {
      // Déjà sélectionné → on le retire
      this.selectedTechnologies.splice(index, 1);
    } else {
      // Pas encore sélectionné → on l'ajoute
      this.selectedTechnologies.push(tech);
    }
    this.updateFilteredProfiles()
  }

  public isSelected(tech: any): boolean {
    return this.selectedTechnologies.includes(tech);
  }

  getIconUrl(skillName: string): string {
    const baseUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
    const primaryUrl = `${baseUrl}${skillName.toLowerCase().replace('.','')}/${skillName.toLowerCase().replace('.','')}-original.svg`;
    return primaryUrl;
  }
}
