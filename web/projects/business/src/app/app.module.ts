import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {SpinnerComponent} from './shared/spinner.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {InterceptorService} from "./core/interceptor/interceptor.service";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {NgxPermissionsModule} from "ngx-permissions";
import {AppSidebarComponent} from "./layouts/pages/full/sidebar/sidebar.component";
import {AppRoutes} from "./app-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    AppSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    LeafletModule,
    NgxPermissionsModule.forRoot(),
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
  exports: [
    AppSidebarComponent,
    SpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
