import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { AuthGuardService } from '../core/guards/auth-guard.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "../core/interceptor/interceptor.service";
import {AuthenticationService} from "../core/guards/authentication.service";
import {appInitializer} from "../core/interceptor/app.initializer.service";
import {CurrencyPipe, DatePipe} from "@angular/common";


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
  imports:[
    HttpClientModule
  ],
  providers: [
    MenuItems,CurrencyPipe,DatePipe,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuardService,
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
      ]
    }
  }
}
