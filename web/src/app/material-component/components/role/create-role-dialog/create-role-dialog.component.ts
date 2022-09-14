import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateRole } from '../../../models/create-role';
import { Role } from '../../../models/role';
import {UserService} from "../../../services/user/user.service";
import {ResponseApi} from "../../../../core/models/response-api";

@Component({
  selector: 'lsn-create-role-dialog',
  templateUrl: './create-role-dialog.component.html',
  styleUrls: ['./create-role-dialog.component.css']
})
export class CreateRoleDialogComponent  implements OnInit, OnDestroy {

  public roleForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }
  );


  constructor(
    private _dialogRef: MatDialogRef<CreateRoleDialogComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: UserService,
  ) {
  }

  ngOnDestroy(): void {
  }


  ngOnInit() {
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
