import 'hammerjs';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

import {CdkTableModule} from '@angular/cdk/table';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialRoutes} from './layouts.routing';

import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {SharedModule} from "../shared/shared.module";
import {NgApexchartsModule} from "ng-apexcharts";
import {MapLockupComponent} from "./pages/map/map-lockup/map-lockup.component";
import {FullComponent} from "./pages/full/full.component";
import {LoginComponent} from "./pages/login/login.component";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AppHeaderComponent} from "./pages/full/header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {AppModule} from "../app.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    LeafletModule,
    FlexLayoutModule,
    NgApexchartsModule,
    SharedModule.forRoot(),
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    AppModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [
    MapLockupComponent,
    FullComponent,
    LoginComponent,
    AppHeaderComponent,
  ]
})
export class LayoutsModule {
}
