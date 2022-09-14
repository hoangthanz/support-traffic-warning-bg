/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ResponseGetProvincesModel} from "../models/gate-config/response-get-provinces.model";
import {environment} from "../../../environments/environment";
import {ResponseGetDistrictsModel} from "../models/gate-config/response-get-districts.model";
import {ResponseGetWardsModel} from "../models/gate-config/response-get-wards.model";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {RequestCreateGateModel} from "../models/gate-config/request-create-gate.model";
import {ResposeCreateGateModel} from "../models/gate-config/respose-create-gate.model";
import {ResposeGetGateModel} from "../models/gate-config/respose-get-gate.model";
import {ResponseGetStationModel} from "../models/station-config/response-get-station.model";
import {RequestCreateStationModel} from "../models/station-config/request-create-station.model";
import {ResponseApi} from "../../core/models/response-api";


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(
    private _httpClient: HttpClient,
    public snackBar: MatSnackBar) {
  }

  getProvincesInfo = () => {
    return this._httpClient.get<ResponseApi<ResponseGetProvincesModel[]>>(`${environment.main_domain}/Provinces`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  getDistrictsInfoByProvinceId = (id: string) => {
    return this._httpClient.get<ResponseApi<ResponseGetDistrictsModel[]>>(`${environment.main_domain}/Districts?Code=${id}`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  getWardsInfoByDistrictId = (id:string) => {
    return this._httpClient.get<ResponseApi<ResponseGetWardsModel[]>>(`${environment.main_domain}/Wards?Code=${id}`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  getGate = () => {
    return this._httpClient.get<ResponseApi<ResposeGetGateModel[]>>(`${environment.main_domain}/Gates`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  createGate = (request: RequestCreateGateModel) => {
    return this._httpClient.post<ResponseApi<ResposeCreateGateModel>>(`${environment.main_domain}/Gates`, request).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  updateGate = (id: number, request: RequestCreateGateModel) => {
    return this._httpClient.put<ResponseApi<ResposeCreateGateModel>>(`${environment.main_domain}/Gates/${id}`, request).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  deleteGate = (id: string) =>{
    return this._httpClient.delete<ResponseApi<ResposeGetGateModel>>(`${environment.main_domain}/Gates/${id}`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  removeGate = (id: string) =>{
    return this._httpClient.delete<ResponseApi<ResposeGetGateModel>>(`${environment.main_domain}/Gates/remove/${id}`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  getStation = () => {
    return this._httpClient.get<ResponseApi<ResponseGetStationModel[]>>(`${environment.main_domain}/Stations`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  createStation = (request: RequestCreateStationModel) => {
    return this._httpClient.post<ResponseApi<any>>(`${environment.main_domain}/Stations`, request).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  deleteStation = (id: string) =>{
    return this._httpClient.delete<ResponseApi<ResponseGetStationModel>>(`${environment.main_domain}/Stations/${id}`).pipe(
      retry(1),
      catchError(this.errorHandl))
  }

  updateStation = (id: number, request: RequestCreateStationModel) => {
    return this._httpClient.put<ResponseApi<any>>(`${environment.main_domain}/Stations/${id}`, request).pipe(
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
