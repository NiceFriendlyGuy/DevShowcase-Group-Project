import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShellComponent } from './shell/shell.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { AdminGuard } from './guard/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    children: [
      { path: '', redirectTo: 'shell', pathMatch: 'full' },

      {
        path: 'shell',
        component: ShellComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'requests',
        component: UserRequestsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'search',
        component: SearchUserComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'unauthorized',
        loadComponent: () =>
          import('./unauthorized/unauthorized.component').then(
            (m) => m.UnauthorizedComponent
          ),
      },
    ],
  },
];
