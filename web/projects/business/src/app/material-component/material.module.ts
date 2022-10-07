import 'hammerjs';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {DemoMaterialModule} from '../demo-material-module';
import {CdkTableModule} from '@angular/cdk/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialRoutes} from './material.routing';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {SharedModule} from "../shared/shared.module";
import {NgApexchartsModule} from "ng-apexcharts";
import {MapLockupComponent} from "./pages/map/map-lockup/map-lockup.component";
import {VehicleTrackingComponent} from "./pages/vehicle-tracking/vehicle-tracking.component";

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
  entryComponents: [],
  declarations: [
    MapLockupComponent,
    VehicleTrackingComponent
  ]
})
export class MaterialComponentsModule {
}
