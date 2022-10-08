import {Routes} from '@angular/router';
import {MapLockupComponent} from "./pages/map/map-lockup/map-lockup.component";
import {VehicleTrackingComponent} from "./pages/vehicle-tracking/vehicle-tracking.component";
import {MonitoringComponent} from "./pages/monitoring/monitoring.component";

export const MaterialRoutes: Routes = [
  {
    path: 'map',
    component: VehicleTrackingComponent
  },
  {
    path: 'monitor',
    component: MonitoringComponent
  },
];
