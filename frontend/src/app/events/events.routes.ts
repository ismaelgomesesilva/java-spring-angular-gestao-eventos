import { Routes } from '@angular/router';

export const EVENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/events-list/events-list.component').then(m => m.EventsListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./components/event-form/event-form.component').then(m => m.EventFormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./components/event-form/event-form.component').then(m => m.EventFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/event-detail/event-detail.component').then(m => m.EventDetailComponent)
  }
];

