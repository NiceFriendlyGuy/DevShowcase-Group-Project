import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.page.html',
  styleUrls: ['projects.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class ProjectsPage {
  constructor() {}
}
