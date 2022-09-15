import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Role} from '../../../models/role';
import {UserService} from "../../../services/user/user.service";
import {UpdateRole} from "../../../models/update-role";
import {ResponseApi} from "../../../../core/models/response-api";

@Component({
  selector: 'update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent {

  public roleForm: FormGroup = new FormGroup(
    {
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required])
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _dialogRef: MatDialogRef<UpdateRoleComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: UserService,
  ) {
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
