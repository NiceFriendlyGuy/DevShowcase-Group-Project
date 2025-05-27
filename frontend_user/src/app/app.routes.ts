import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'new-project',
    loadComponent: () => import('./pages/new-project/new-project.page').then( m => m.NewProjectPage)
  },
  {
    path: 'edit-project',
    loadComponent: () => import('./pages/edit-project/edit-project.page').then( m => m.EditProjectPage)
  },

];
