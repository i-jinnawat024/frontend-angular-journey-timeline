import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/timeline',
    pathMatch: 'full'
  },
  {
    path: 'timeline',
    loadComponent: () => import('./features/timeline/components/timeline-page/timeline-page.component').then(m => m.TimelinePageComponent)
  },
  {
    path: 'project/:id',
    loadComponent: () => import('./features/timeline/components/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)
  },
  {
    path: '**',
    redirectTo: '/timeline'
  }
];
