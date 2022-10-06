import { Injectable, Injector } from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Router } from "@angular/router";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {BehaviorSubject, Observable} from "rxjs";
import { finalize } from "rxjs/operators";
import { AuthenticationService } from "../guards/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    public auth: AuthenticationService,
    private injector: Injector,
    public router: Router,
    public currencyPipe: CurrencyPipe,
    public datePipe: DatePipe,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      },
    });
    return next.handle(request);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
