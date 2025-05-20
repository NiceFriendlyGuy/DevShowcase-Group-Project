import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { imagesOutline, informationCircleOutline } from 'ionicons/icons';

addIcons({
  'images-outline': imagesOutline,
  'information-circle-outline': informationCircleOutline
});

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
