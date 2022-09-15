import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {ResponseApi} from "../../../../core/models/response-api";
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'create-level',
  templateUrl: './create-level.component.html',
  styleUrls: ['./create-level.component.css']
})
export class CreateLevelComponent {

  public roleForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    }
  );

  constructor(
    private _dialogRef: MatDialogRef<CreateLevelComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: ConfigService,
  ) {
  }

  createRole = () => {
    const role = this.roleForm.value;
    this._permissionService.createLevel(role).subscribe(
      (response: any) => {
        if (1 !== response?.result) {
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
