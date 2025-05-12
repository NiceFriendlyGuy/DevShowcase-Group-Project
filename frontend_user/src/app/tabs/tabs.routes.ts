import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'projects',
        loadComponent: () =>
          import('../projects-tab/projects.page').then((m) => m.ProjectsPage),
      },
      {
        path: 'profiles',
        loadComponent: () =>
          import('../profiles-tab/profiles.page').then((m) => m.ProfilesPage),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('../account-tab/account.page').then((m) => m.AccountPage),
      },
      {
        path: '',
        redirectTo: '/tabs/projects',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/projects',
    pathMatch: 'full',
  },
];
