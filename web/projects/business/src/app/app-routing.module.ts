import {Routes} from '@angular/router';

import {LoginComponent} from "./layouts/pages/login/login.component";
import {AuthGuardService} from "./core/guards/auth-guard.service";
import {FullComponent} from "./layouts/pages/full/full.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuardService],
    children: [

    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuardService],
  }
];
