import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {throwError} from "rxjs";
import {ResponseGetProvincesModel} from "../../models/gate-config/response-get-provinces.model";
import {environment} from "../../../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {User} from "../../../shared/models/user";
import {UpdateRole} from "../../models/update-role";
import {CreateRole} from "../../models/create-role";
import {ResponseApi} from "../../../core/models/response-api";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _httpClient: HttpClient,
    public snackBar: MatSnackBar) {
  }

  Login = (userName: string, password: string) => {
    // @ts-ignore
    return this._httpClient.post<any>(`${environment.main_domain}/user/authenticate`, {
      username: userName,
      password: password
    }).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  GetUserByGateId = (gateId: number) => {
    return this._httpClient.get<ResponseApi<User[]>>(`${environment.main_domain}/user/get-user-by-gate/${gateId}`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  getPermissionsAdmin = () => this._httpClient.get<any>(`${environment.main_domain}/admin/get-all-permission`).pipe(
    retry(1),
    catchError(this.errorHandl)
  );

  getRoleAdmin = () => this._httpClient.get<any>(`${environment.main_domain}/admin/role`).pipe(
    retry(1),
    catchError(this.errorHandl)
  );

  getRoleInGate = () => this._httpClient.get<any>(`${environment.main_domain}/admin/role/in-gate`).pipe(
    retry(1),
    catchError(this.errorHandl)
  );

  getPermissionsDisplay = () => this._httpClient.get<any>(`${environment.main_domain}/admin/get-ui-permissions/17`).pipe(
    retry(1),
    catchError(this.errorHandl)
  );

  updateRoleDisplayPermission = (id: string, role: UpdateRole) => this._httpClient.put<any>(`${environment.main_domain}/admin/role/update-ui/${id}`, role).pipe(
    retry(1),
    catchError(this.errorHandl)
  );


  deleteRoleAdmin = (id: string) => this._httpClient.delete<any>(`${environment.main_domain}/admin/role/delete/${id}`).pipe(
    retry(1),
    catchError(this.errorHandl)
  );

  updateRoleAdmin = (id: string, role: UpdateRole) => this._httpClient.put<any>(`${environment.main_domain}/admin/role/update/${id}`, role).pipe(
    retry(1),
    catchError(this.errorHandl)
  );

  createRoleAdmin = (role: CreateRole) => this._httpClient.post<any>(`${environment.main_domain}/admin/role/create`, role).pipe(
    retry(1),
    catchError(this.errorHandl)
  );

  getPermissionByRole = (id: string) => this._httpClient.get<any>(`${environment.main_domain}/admin/getpermission-role/${id}`).pipe(
    retry(1),
    catchError(this.errorHandl)
  );

  public openNotify(typeOfMessage: number, message: string = '', action: string = '', duration: number = 2500
    , horizontalPosition: MatSnackBarHorizontalPosition = 'right',
                    verticalPosition: MatSnackBarVerticalPosition = 'top', className: string = 'background-green') {

    if (1 === typeOfMessage)
      className = 'background-green';

    if (-1 === typeOfMessage)
      className = 'background-red';

    if (-2 === typeOfMessage)
      className = 'background-warning';

    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: [className]
    });
  }

  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(errorMessage)
  }
}
