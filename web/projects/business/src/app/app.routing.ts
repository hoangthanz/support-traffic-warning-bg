import {Routes} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuardService} from "./core/guards/auth-guard.service";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    // canActivate: [AuthGuardService],
  }
];
