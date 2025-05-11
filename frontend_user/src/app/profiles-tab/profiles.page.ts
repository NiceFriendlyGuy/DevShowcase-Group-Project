import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { DevelopersComponent } from '../components/developers/developers.component';
@Component({
  selector: 'app-profiles',
  templateUrl: 'profiles.page.html',
  styleUrls: ['profiles.page.scss'],
  imports: [DevelopersComponent, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class profilesPage {

  constructor() {}

}
