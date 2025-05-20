import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IonInput, IonItem } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule, IonItem, IonInput],
})
export class SearchComponent implements OnInit {
  @Input() public profiles: any[] = [];
  @Input() public selectedTechnologies: any[] = [];
  @Output() public filteredProfiles = new EventEmitter<any[]>();

  public searchTerm: string = '';

  constructor() {}

  ngOnInit() {
    this.updateFilteredProfiles();
  }

  ngOnChanges() {
    this.updateFilteredProfiles(); // or any logic you want to run on input change
  }

  public filterProfiles() {
    if (
      this.searchTerm.length === 0 &&
      this.selectedTechnologies.length === 0
    ) {
      return this.profiles;
    }
    const lowerCaseTerm: any[] = this.searchTerm.toLowerCase().split(' ');
    return this.profiles.filter((profile) => {
      let match = false;
      for (let term of lowerCaseTerm) {
        if (term.length > 0) {
          match =
            match ||
            profile.name.toLowerCase().includes(term) ||
            profile.surname.toLowerCase().includes(term) ||
            profile.email.toLowerCase().includes(term) ||
            profile.bio.toLowerCase().includes(term) ||
            profile.technologies?.some((item: any) =>
              item.name.toLowerCase().includes(term)
            );
        }
      }
      if (this.selectedTechnologies.length > 0) {
        match =
          match ||
          this.selectedTechnologies.some((tech: any) =>
            profile.technologies?.some((item: any) => item.name === tech.name)
          );
      }
      return match;
    });
  }

  public updateFilteredProfiles() {
    const filtered = this.filterProfiles();
    this.filteredProfiles.emit(filtered); // Emit to parent
  }
}
