import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {MenuItems} from './menu-items/menu-items';
import {AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective} from './accordion';
import {AuthGuardService} from '../core/guards/auth-guard.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "../core/interceptor/interceptor.service";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {LocationService} from "./services/location.service";
import {appInitializer} from "../core/interceptor/app.initializer.service";
import {AuthenticationService} from "../core/guards/authentication.service";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  imports: [
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    MenuItems,
    CurrencyPipe,
    DatePipe,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuardService,
        LocationService,
        {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService]},
        {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
      ]
    }
  }
}
