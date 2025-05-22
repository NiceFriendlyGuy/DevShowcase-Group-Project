import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 👇 Import ng2-charts provider tools
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideCharts(withDefaultRegisterables()), // 👈 this enables chart rendering
  ]
}).catch((err) => console.error(err));
