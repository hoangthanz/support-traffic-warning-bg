import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {UserToken} from "../models/user-token";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NgxPermissionsService} from 'ngx-permissions';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject!: BehaviorSubject<UserToken>;
  public user!: Observable<UserToken>;
  private refreshTokenTimeout: any;
  public permissions: string[] = [];

  public ipAddress = '';
  public currentUser: UserToken = new UserToken();

  constructor(
    public jwtHelper: JwtHelperService,
    public router: Router,
    private http: HttpClient,
    private permissionsService: NgxPermissionsService,
    public dialog: MatDialog,
    public jwtHelperService: JwtHelperService,
    public cookieService: CookieService,
  ) {
    this.userSubject = new BehaviorSubject<UserToken>(new UserToken());
    this.user = this.userSubject.asObservable();
    this.loadOldPermission();
  }

  public getToken() {
    return sessionStorage.getItem('access_token');
  }

  public convertObjectToString = (object: any) => JSON.stringify(object);

  public isAuthenticated(): boolean {
    const token = this.getToken();

    if (null === token || token == 'null')
      return false;

    return !this.jwtHelper.isTokenExpired(token.toString());
  }


  public get userTokenValue(): UserToken {
    return this.userSubject.value;
  }

  login = (username: string, password: string, hasRemember: boolean) => this.http.post<UserToken>(`${environment.main_domain}/user/authentication`, {
    username,
    password
  }, {withCredentials: true})
    .pipe(map((user: UserToken) => {

      this.currentUser = user;
      sessionStorage.setItem('access_token', user.token);
      sessionStorage.setItem('refresh-token', user.refreshToken);

      if (hasRemember) {
        localStorage.setItem('remember_user_name', username);
        localStorage.setItem('remember_password', password);
      }

      this.cookieService.set('refresh-token', user.refreshToken, {
        expires: new Date(user.expiration),
        path: '/',
        secure: true
      });
      let permissions = user.listClaims;
      this.permissions = permissions;
      permissions = (Array.isArray(permissions)) ? permissions : [permissions];

      // save to section
      sessionStorage.setItem('permissions', this.convertObjectToString(user.listClaims));
      this.permissionsService.loadPermissions(permissions);

      this.userSubject.next(user);
      this.startRefreshTokenTimer();
      return user;
    }));

  logout() {

    let refToken = '';

    if (location.protocol == 'http:')
      refToken = this.cookieService.get('refresh-token');

    this.http.post<any>(`${environment.main_domain}/user/revoke-token`, {token: refToken}).subscribe();
    this.cookieService.delete('refresh-token');
    sessionStorage.clear();

    this.stopRefreshTokenTimer();
    this.userSubject.next(new UserToken());
    this.router.navigate(['/login']);
  }

  refreshToken() {
    let cookie = '';
    if (location.protocol == 'http:')
      cookie = this.cookieService.get('refresh-token');
    return this.http.get<any>(`${environment.main_domain}/user/refresh-token/${cookie}`,)
      .pipe(
        map((user: UserToken) => {
          this.currentUser = user;
          this.cookieService.deleteAll();
          sessionStorage.clear();
          this.cookieService.set('refresh-token', user.refreshToken, {
            expires: new Date(user.expiration),
            path: '/',
            secure: true
          });
          sessionStorage.setItem('access_token', user.token);
          sessionStorage.setItem('permissions', this.convertObjectToString(user.listClaims));

          let permissions = this.jwtHelper?.decodeToken(user.token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          permissions = (Array.isArray(permissions)) ? permissions : [permissions];


          // save to section
          this.cookieService.set('permissions', this.convertObjectToString(user.listClaims));
          this.permissionsService.loadPermissions(permissions);

          // this.permissions = permissions;
          // this.permissionsService.loadPermissions(permissions);


          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        }),
        catchError(err => {
          this.clearSession();
          return of('error', err);
        })
      );
  }

  async startApp() {
    return new Promise<void>(async (resolve, reject) => {
      // console.log("AppInitService.init() called");
      // if (this.isAuthenticated()) {
      //   const token = await this.refreshTokenAsync();
      //   if ('' === token || null === token) {
      //     this.clearSession();
      //     resolve();
      //   } else {
      //
      //     resolve();
      //   }
      // } else {
      //   this.clearSession();
      //   resolve();
      // }
      resolve();
    });
  }


  private clearSession() {
    // localStorage.clear();
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  getIpAddress = () => {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.get("http://api.ipify.org/?format=json", {headers: headers}).pipe(map((ip: any) => {
      return ip;
    }));
  }


  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = this.jwtHelperService.decodeToken(this.userTokenValue.token);

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 30000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  private loadOldPermission() {
    const token = this.getToken();
    if (token) {
      let permissions = this.currentUser.listClaims;
      permissions = (Array.isArray(permissions)) ? permissions : [permissions];
      this.permissionsService.loadPermissions(permissions);
      this.permissions = permissions;
    }
  }

}
