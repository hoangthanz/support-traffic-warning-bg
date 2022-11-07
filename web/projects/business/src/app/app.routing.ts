import { Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuardService } from "./core/guards/auth-guard.service";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { GisMapOsmComponent } from './gis-map-osm/gis-map-osm.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: GisMapOsmComponent,
    canActivate: [AuthGuardService]
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
