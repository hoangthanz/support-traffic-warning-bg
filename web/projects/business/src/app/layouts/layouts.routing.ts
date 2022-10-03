import {Routes} from '@angular/router';

import {MapLockupComponent} from "./pages/map/map-lockup/map-lockup.component";
import {LoginComponent} from "./pages/login/login.component";

export const MaterialRoutes: Routes = [
  {
    path: 'map-lockup',
    component: MapLockupComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuardService],
  }
];
