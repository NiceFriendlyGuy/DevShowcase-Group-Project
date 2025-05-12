import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProfileComponent } from '../components/profile/profile.component'

@Component({
  selector: 'app-profiles',
  templateUrl: 'profiles.page.html',
  styleUrls: ['profiles.page.scss'],
  imports: [ProfileComponent, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class profilesPage {
  private profilesService: ProfilesService = inject<ProfilesService>(ProfilesService);
  public profiles: any[] = [];

  constructor() {}
  ngOnInit() {
    this.profiles = this.profilesService.getProfilesAll();

  }

}
