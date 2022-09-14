import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Role } from '../../../models/role';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import {UserService} from "../../../services/user/user.service";
import {UpdateRole} from "../../../models/update-role";
import {ResponseApi} from "../../../../core/models/response-api";

@Component({
  selector: 'lsn-update-role-dialog',
  templateUrl: './update-role-dialog.component.html',
  styleUrls: ['./update-role-dialog.component.css']
})
export class UpdateRoleDialogComponent implements OnInit, OnDestroy {

  public roleForm: FormGroup = new FormGroup(
    {
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }
  );


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _dialogRef: MatDialogRef<UpdateRoleDialogComponent>,
    public router: Router,
    public currencyPipe: CurrencyPipe,
    public datePipe: DatePipe,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _permissionService: UserService,
    public jwtHelperService: JwtHelperService,
    public cookieService: CookieService,
    public deviceService: DeviceDetectorService,
  ) {
  }

  ngOnDestroy(): void {
  }


  ngOnInit() {
    this.roleForm = new FormGroup(
      {
        id: new FormControl(this.data.role.id, [Validators.required]),
        name: new FormControl(this.data.role.name, [Validators.required]),
        displayName: new FormControl(this.data.role.displayName, [Validators.required])
      }
    );
  }


  createRole = () => {
    const role = <UpdateRole>this.roleForm.value;

    const id: string = this.data.role.id;

    if (this.roleForm.invalid) {
      return;
    }

    this._permissionService.updateDisplayNameRole(id, role.displayName).subscribe(
      (response: ResponseApi<Role[]>) => {
        if (1 !== response.result) {
          this._permissionService.openNotify(-1, response.message);
          return;
        }

        this._permissionService.openNotify(1, response.message);
        this._dialogRef.close(true);
      },
      (error) => {
        this._permissionService.openNotify(-1,'Can not update role');
      }
    );
  }
}
