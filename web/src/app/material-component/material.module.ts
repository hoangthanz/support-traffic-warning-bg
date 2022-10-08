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
import {AccountConfigComponent} from './pages/account-config/account-config.component';
import {PermissionForRolePageComponent} from "./pages/permission-config/permission-for-role-page.component";
import {RolePageComponent} from "./pages/role-page/role-page.component";
import {UpdateRoleComponent} from "./components/role/update-role/update-role.component";
import {CreateRoleComponent} from "./components/role/create-role/create-role.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {LevelPageComponent} from "./pages/level-page/level-page.component";
import {UpdateLevelComponent} from "./components/level/update-level/update-level.component";
import {CreateLevelComponent} from "./components/level/create-level/create-level.component";
import {VehiclePageComponent} from "./pages/vehicle-page/vehicle-page.component";
import {CreateVehicleComponent} from "./components/vehicle/create-vehicle/create-vehicle.component";
import {UpdateVehicleComponent} from "./components/vehicle/update-level/update-vehicle.component";
import {CompanyPageComponent} from "./pages/company-page/company-page.component";
import {UpdateCompanyComponent} from "./components/company/update-company/update-company.component";
import {CreateCompanyComponent} from "./components/company/create-company/create-company.component";
import {GateLevelPageComponent} from "./pages/gate-level-page/gate-level-page.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {UpdateGateLevelComponent} from "./components/gate-level/update-level/update-gate-level.component";
import {CreateGateLevelComponent} from "./components/gate-level/create-level/create-gate-level.component";

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
    SharedModule.forRoot(),
    DragDropModule
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
    RolePageComponent,
    UpdateRoleComponent,
    CreateRoleComponent,
    CreateUserComponent,
    LevelPageComponent,
    UpdateLevelComponent,
    CreateLevelComponent,
    VehiclePageComponent,
    CreateVehicleComponent,
    UpdateVehicleComponent,
    CompanyPageComponent,
    UpdateCompanyComponent,
    CreateCompanyComponent,
    AccountConfigComponent,
    GateLevelPageComponent,
    UpdateGateLevelComponent,
    CreateGateLevelComponent,
  ]
})
export class MaterialComponentsModule {
}
