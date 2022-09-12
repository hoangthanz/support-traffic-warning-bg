import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {throwError} from "rxjs";
import {ResponseApi} from "../../models/response-api";
import {ResponseGetProvincesModel} from "../../models/gate-config/response-get-provinces.model";
import {environment} from "../../../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {User} from "../../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _httpClient: HttpClient,
    public snackBar: MatSnackBar) {
  }

  GetUserByGateId = (gateId: number) => {
    return this._httpClient.get<ResponseApi<User[]>>(`${environment.main_domain}/user/get-user-by-gate/${gateId}`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

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
