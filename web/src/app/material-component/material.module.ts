import 'hammerjs';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

import {DemoMaterialModule} from '../demo-material-module';
import {CdkTableModule} from '@angular/cdk/table';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialRoutes} from './material.routing';

import {GridComponent} from './pages/demo/grid/grid.component';
import {ListsComponent} from './pages/demo/lists/lists.component';
import {MenuComponent} from './pages/demo/menu/menu.component';
import {TabsComponent} from './pages/demo/tabs/tabs.component';
import {StepperComponent} from './pages/demo/stepper/stepper.component';
import {ExpansionComponent} from './pages/demo/expansion/expansion.component';
import {ChipsComponent} from './pages/demo/chips/chips.component';
import {ToolbarComponent} from './pages/demo/toolbar/toolbar.component';
import {ProgressSnipperComponent} from './pages/demo/progress-snipper/progress-snipper.component';
import {ProgressComponent} from './pages/demo/progress/progress.component';
import {
  DialogComponent,
  DialogOverviewExampleDialogComponent
} from './pages/demo/dialog/dialog.component';
import {TooltipComponent} from './pages/demo/tooltip/tooltip.component';
import {SnackbarComponent} from './pages/demo/snackbar/snackbar.component';
import {SliderComponent} from './pages/demo/slider/slider.component';
import {SlideToggleComponent} from './pages/demo/slide-toggle/slide-toggle.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {GateConfigComponent} from './pages/gate-config/gate-config.component';
import {CuGateConfigComponent} from './components/cu-gate-config/cu-gate-config.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {StationConfigComponent} from './pages/station-config/station-config.component';
import {SharedModule} from "../shared/shared.module";
import {VehicleTrafficChartComponent} from './pages/vehicle-traffic-chart/vehicle-traffic-chart.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {CuStationConfigComponent} from './components/cu-station-config/cu-station-config.component';
import {VehicleTrackingComponent} from "./pages/vehicle-tracking/vehicle-tracking.component";
import {MapLockupComponent} from "./pages/map/map-lockup/map-lockup.component";
import {RoleConfigComponent} from './pages/role-config/role-config.component';
import {AccountConfigComponent} from './pages/account-config/account-config.component';
import {PermissionForRolePageComponent} from "./pages/permission-config/permission-for-role-page.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    LeafletModule,
    FlexLayoutModule,
    NgApexchartsModule,
    SharedModule.forRoot()
  ],
  providers: [],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialogComponent,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    GateConfigComponent,
    CuGateConfigComponent,
    ConfirmDialogComponent,
    StationConfigComponent,
    VehicleTrafficChartComponent,
    VehicleTrackingComponent,
    CuStationConfigComponent,
    MapLockupComponent,
    PermissionForRolePageComponent,
    RoleConfigComponent,
    AccountConfigComponent
  ]
})
export class MaterialComponentsModule {
}
