import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'signup',
    component: SignupComponent

  },
];
