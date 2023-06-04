import { Routes } from "@angular/router";
import { HomePage } from "./home.page";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/practice',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'history',
        loadComponent: () => import('../history/history.page').then((m) => m.HistoryPage)
      },
      {
        path: 'practice',
        loadComponent: () => import('../practice/practice.page').then((m) => m.PracticePage)
      }
    ]
  }
]