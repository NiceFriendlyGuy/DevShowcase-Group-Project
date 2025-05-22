import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { imagesOutline, informationCircleOutline, openOutline,  close } from 'ionicons/icons';

addIcons({
  'images-outline': imagesOutline,
  'information-circle-outline': informationCircleOutline,
  'open-outline' : openOutline,
  'close' : close,
});

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
