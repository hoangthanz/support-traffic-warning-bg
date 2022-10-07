import {Routes} from '@angular/router';
import {MapLockupComponent} from "./pages/map/map-lockup/map-lockup.component";
import {VehicleTrackingComponent} from "./pages/vehicle-tracking/vehicle-tracking.component";

export const MaterialRoutes: Routes = [
  {
    path: '',
    component: VehicleTrackingComponent
  },
];
