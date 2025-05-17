import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, people, logIn, person, laptop } from 'ionicons/icons';
import { AuthService } from '../services/auth.service'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [CommonModule,IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  public authService = inject(AuthService);
  constructor() {
    addIcons({ triangle, ellipse, square, person, people, logIn, laptop });
  }
}
