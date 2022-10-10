import {Routes} from '@angular/router';

import {ListsComponent} from './pages/demo/lists/lists.component';
import {TabsComponent} from './pages/demo/tabs/tabs.component';
import {StepperComponent} from './pages/demo/stepper/stepper.component';
import {ExpansionComponent} from './pages/demo/expansion/expansion.component';
import {ChipsComponent} from './pages/demo/chips/chips.component';
import {ToolbarComponent} from './pages/demo/toolbar/toolbar.component';
import {ProgressSnipperComponent} from './pages/demo/progress-snipper/progress-snipper.component';
import {ProgressComponent} from './pages/demo/progress/progress.component';
import {DialogComponent} from './pages/demo/dialog/dialog.component';
import {TooltipComponent} from './pages/demo/tooltip/tooltip.component';
import {SnackbarComponent} from './pages/demo/snackbar/snackbar.component';
import {SliderComponent} from './pages/demo/slider/slider.component';
import {SlideToggleComponent} from './pages/demo/slide-toggle/slide-toggle.component';
import {GateConfigComponent} from './pages/gate-config/gate-config.component';
import {StationConfigComponent} from "./pages/station-config/station-config.component";
import {VehicleTrafficChartComponent} from "./pages/vehicle-traffic-chart/vehicle-traffic-chart.component";
import {VehicleTrackingComponent} from "./pages/vehicle-tracking/vehicle-tracking.component";
import {MapLockupComponent} from "./pages/map/map-lockup/map-lockup.component";
import {AccountConfigComponent} from "./pages/account-config/account-config.component";
import {PermissionForRolePageComponent} from "./pages/permission-config/permission-for-role-page.component";
import {RolePageComponent} from "./pages/role-page/role-page.component";
import {LevelPageComponent} from "./pages/level-page/level-page.component";
import {VehiclePageComponent} from "./pages/vehicle-page/vehicle-page.component";
import {CompanyPageComponent} from "./pages/company-page/company-page.component";
import {GateLevelPageComponent} from "./pages/gate-level-page/gate-level-page.component";

export const MaterialRoutes: Routes = [
  {
    path: 'account-config',
    component: AccountConfigComponent
  },
  {
    path: 'gate-config',
    component: GateConfigComponent
  },
  {
    path: 'gate-level',
    component: GateLevelPageComponent
  },
  {
    path: 'vehicle-traffic-chart',
    component: VehicleTrafficChartComponent
  },
  {
    path: 'vehicle-tracking',
    component: VehicleTrackingComponent
  },
  {
    path: 'station-config',
    component: StationConfigComponent
  },
  {
    path: 'permission-for-role',
    component: PermissionForRolePageComponent
  },
  {
    path: 'role',
    component: RolePageComponent
  },
  {
    path: 'level',
    component: LevelPageComponent
  },
  {
    path: 'vehicle',
    component: VehiclePageComponent
  },
  {
    path: 'company',
    component: CompanyPageComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'map-lockup',
    component: MapLockupComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'expansion',
    component: ExpansionComponent
  },
  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'toolbar',
    component: ToolbarComponent
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'tooltip',
    component: TooltipComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent
  }
];
