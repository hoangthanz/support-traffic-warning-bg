import {Routes} from '@angular/router';

import {ListsComponent} from './lists/lists.component';
import {TabsComponent} from './tabs/tabs.component';
import {StepperComponent} from './stepper/stepper.component';
import {ExpansionComponent} from './expansion/expansion.component';
import {ChipsComponent} from './chips/chips.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {ProgressSnipperComponent} from './progress-snipper/progress-snipper.component';
import {ProgressComponent} from './progress/progress.component';
import {DialogComponent} from './dialog/dialog.component';
import {TooltipComponent} from './tooltip/tooltip.component';
import {SnackbarComponent} from './snackbar/snackbar.component';
import {SliderComponent} from './slider/slider.component';
import {SlideToggleComponent} from './slide-toggle/slide-toggle.component';
import {GateConfigComponent} from './pages/gate-config/gate-config.component';
import {StationConfigComponent} from "./pages/station-config/station-config.component";
import {VehicleTrafficChartComponent} from "./vehicle-traffic-chart/vehicle-traffic-chart.component";
import {VehicleRegisterComponent} from "./vehicle-register/vehicle-register.component";
import {MapLockupComponent} from "./map/map-lockup/map-lockup.component";
import {AccountConfigComponent} from "./pages/account-config/account-config.component";

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
    path: 'vehicle-traffic-chart',
    component: VehicleTrafficChartComponent
  },
  {
    path: 'vehicle-register',
    component: VehicleRegisterComponent
  },
  {
    path: 'station-config',
    component: StationConfigComponent
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
