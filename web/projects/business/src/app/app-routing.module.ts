import {Routes} from '@angular/router';

import {AuthGuardService} from "./core/guards/auth-guard.service";
import {FullComponent} from "./layouts/pages/full/full.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuardService],
    children: [],
    loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule)
  },
];
