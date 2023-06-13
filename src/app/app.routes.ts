import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.routes').then((m) => m.routes),
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats/stats.page').then( m => m.StatsPage)
  },
];
