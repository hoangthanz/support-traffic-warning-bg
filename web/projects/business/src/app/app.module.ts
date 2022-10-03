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
import {LoginComponent} from './layouts/pages/login/login.component';
import {FullComponent} from "./layouts/pages/full/full.component";
import {AppHeaderComponent} from "./layouts/pages/full/header/header.component";
import {AppSidebarComponent} from "./layouts/pages/full/sidebar/sidebar.component";
import {AppRoutes} from "./app-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent
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
  bootstrap: [AppComponent]
})
export class AppModule {}
