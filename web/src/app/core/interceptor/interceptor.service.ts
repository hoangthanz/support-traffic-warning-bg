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
        // Authorization: `Bearer ${this.auth.getToken()}`
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZDYwNzU2NC03YzQ1LTQyYjEtOTlmMC05Mzg5MjE1NzczNDgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibHVhbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJtYW55Um9sZSIsImdhdGUiXSwiZXhwIjoxNjYyNjUzNzAyLCJpc3MiOiJ0aGFuaG9hbmd6IiwiYXVkIjoidGhhbmhvYW5neiJ9.VvlO0wJ0OjeB7E9VGUJAwA29SBAKWHDTIUni6H4OB3E`
      },
    });
    return next.handle(request);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}