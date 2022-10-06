import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateRole } from '../../../models/create-role';
import { Role } from '../../../models/role';
import {UserService} from "../../../services/user/user.service";
import {ResponseApi} from "../../../../core/models/response-api";

@Component({
  selector: 'create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {

  public roleForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }
  );

  constructor(
    private _dialogRef: MatDialogRef<CreateRoleComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: UserService,
  ) {
  }

  createRole = () => {
    const role = <CreateRole>this.roleForm.value;
    role.listPermission = [];
    if (this.roleForm.invalid) {
      return;
    }

    this._permissionService.createRoleAdmin(role).subscribe(
      (response: ResponseApi<Role[]>) => {
        if (1 !== response.result) {
          this._permissionService.openNotify(-1, response.message);
          return;
        }

        this._permissionService.openNotify(1, response.message);
        this._dialogRef.close(true);
      },
      (error) => {
        this._permissionService.openNotify(-1, 'Có lỗi xảy ra');
      }
    );
  }
}
