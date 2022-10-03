import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {User} from "../../shared/models/user";
import {ResponseApi} from "../../core/models/response-api";

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

    getRoles = () => {
        return this._httpClient.get<ResponseApi<any>>(`${environment.main_domain}/admin/get-roles`).pipe(
            retry(1),
            catchError(this.errorHandl))
    }


    getRoleByUser = (id: number) => {
        return this._httpClient.get<ResponseApi<any>>(`${environment.main_domain}/admin/get-roles-by-user-id/${id}`).pipe(
            retry(1),
            catchError(this.errorHandl))
    }


    createUserAccount = (payload: any) => {
        return this._httpClient.post<ResponseApi<any>>(`${environment.main_domain}/user/register`, payload).pipe(
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

    public orderArrayBy = (arr: any[], key: string | number, isDate: boolean = false) => {
        if (!isDate)
            return arr.sort((a, b) => {
                if (a[key] > b[key]) return 1;
                if (a[key] < b[key]) return -1;
                return 0;
            });

        return arr.sort((a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime());
    }

    /* clone để tránh trùng ô nhớ  */
    public clone(object: unknown) {
        const ObjStr = JSON.stringify(object);
        return JSON.parse(ObjStr);
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
