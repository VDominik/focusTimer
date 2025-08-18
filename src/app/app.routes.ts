import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Countdown } from './countdown/countdown';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  { path: 'countdown', component: Countdown },
];
