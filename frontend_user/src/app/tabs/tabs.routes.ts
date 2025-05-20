import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'projects',
        children: [
          {
          path: '',
          loadComponent: () =>
            import('../projects-tab/projects.page').then((m) => m.ProjectsPage),
          },
          {
          path: 'projectDetails/:id',
          loadComponent: () =>
            import('../components/project-details/project-details.component').then((m) => m.ProjectDetailsComponent),
          },
        ],
      },
      {
        path: 'profiles',
        loadComponent: () =>
          import('../profiles-tab/profiles.page').then((m) => m.ProfilesPage),
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../account-tab/account.page').then((m) => m.AccountPage),
            canActivate: [AuthGuard], // Protect the account route
          },
          {
            path: 'login',
            loadComponent: () =>
              import('../components/login/login.component').then((m) => m.LoginComponent),
          },
        ],
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
