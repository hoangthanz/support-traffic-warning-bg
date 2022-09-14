import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from "../../services/user/user.service";
import {ResponseApi} from "../../../core/models/response-api";
import {Permission} from "../../models/permission";
import {Role} from "../../models/role";
import {UpdateRole} from "../../models/update-role";

@Component({
  selector: 'permission-config',
  templateUrl: './permission-for-role-page.component.html',
  styleUrls: ['./permission-for-role-page.component.css']
})
export class PermissionForRolePageComponent implements OnInit, OnDestroy {

  permissions: Permission[] = [];
  roles: Role[] = [];

  selectedRole: Role = new Role();

  selectedPermissions: string[] = [];

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    private _permissionService: UserService,
    public dialog: MatDialog
  ) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.getPermissionAdmin();
    this.getRolesAdmin();
  }

  getPermissionAdmin = () => this._permissionService.getPermissionsAdmin().subscribe(
    (response: ResponseApi<Permission[]>) => {

      if (1 !== response.result) {
        this.permissions = [];
      }

      this.permissions = <Permission[]>response.data;
    },
    (error) => {
      this.permissions = [];
    }
  );


  getRolesAdmin = () => this._permissionService.getRoleAdmin().subscribe(
    (response: ResponseApi<Role[]>) => {
      let message = '';

      if (1 !== response.result) {
        this.roles = [];
      }

      this.roles = this.orderArrayBy(<Role[]>response.data, 'displayName');

      this.selectedRole = this.clone(this.roles[0]);
      this.getPermissionByRole(this.selectedRole.id);
    },
    (error) => {
      this.roles = [];
    }
  );

  roleSelection = (selectedRole: Role) => {
    this.selectedRole = selectedRole;
    this.getPermissionByRole(this.selectedRole.id);
  }

  changeSelectedPermissions = (e: MatCheckboxChange, permissionName: string) => {
    if (!e.checked) {
      this.selectedPermissions = this.selectedPermissions.filter(permission => permission != permissionName);
      return;
    }

    this.selectedPermissions.push(permissionName);
  }

  updatePermissionRole = (selectedRole: Role, selectedPermissions: string[]) => {
    if (0 === selectedPermissions.length)
      return;

    let updateRole = new UpdateRole(selectedRole.displayName, this.selectedPermissions, selectedRole.roleInGate);

    this._permissionService.updateRoleAdmin(selectedRole.id, updateRole).subscribe(
      (response: ResponseApi<string>) => {
        if (1 !== response.result)
          this.openNotify(-1, 'Cập nhật quyền cho nhóm người dùng thất bại');

        this.openNotify(1, 'Cập nhật thành công');
      },
      (error) => {
        this.openNotify(-1, 'Cập nhật quyền cho nhóm người dùng thất bại');
      }
    )
  }

  getPermissionByRole = (id: string) => {
    this._permissionService.getPermissionByRole(id).subscribe(
      (response: ResponseApi<string[]>) => {
        if (1 !== response.result) {
          this.selectedPermissions = [];
        }
        this.selectedPermissions = <string[]>response.data;
      },
      (error) => {
        this.selectedPermissions = [];
      }
    );
  }

  refresh = () => this.getPermissionByRole(this.selectedRole.id);
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
}
