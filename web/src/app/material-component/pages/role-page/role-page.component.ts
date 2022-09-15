import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Permission } from '../../models/permission';
import { Role } from '../../models/role';
import {UserService} from "../../services/user/user.service";
import {ResponseApi} from "../../../core/models/response-api";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {UpdateRoleComponent} from "../../components/role/update-role/update-role.component";
import {CreateRoleComponent} from "../../components/role/create-role/create-role.component";

@Component({
  selector: 'lsn-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.css']
})
export class RolePageComponent implements OnInit, OnDestroy {

  roleColumns: string[] = ['index', 'displayName', 'name', 'normalizedName', 'controls'];
  roleSource = new MatTableDataSource<any>([]);


  permissions: Permission[] = [];
  roles: Role[] = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: UserService,
  ) {
  }

  ngOnDestroy(): void {
  }


  ngOnInit() {
    this.getRolesAdmin();
    this.getPermissionAdmin();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.roleColumns, event.previousIndex, event.currentIndex);
  }


  getPermissionAdmin = () => this._permissionService.getPermissionsAdmin().subscribe(
    (response: ResponseApi<Permission[]>) => {
      this.permissions = response.data;
    },
    (error) => {
      this.permissions = [];
    }
  );


  getRolesAdmin = () => this._permissionService.getRoleAdmin().subscribe(
    (response: ResponseApi<Role[]>) => {

      if (1 !== response.result) {
        this.roles = [];
        this.setRoleSource(this.roles);
        return;
      }

      this.roles = this._permissionService.orderArrayBy(<Role[]>response.data, 'displayName');

      let i = 1;
      this.roles.forEach((item) => {
        item.index = i;
        i++;
      });

      this.setRoleSource(this.roles);
    },
    (error) => {
      this.roles = [];
      this.setRoleSource([]);
    }
  );

  setRoleSource = (roles: Role[]) => {
    this.roleSource = new MatTableDataSource<Role>(roles);
    this.roleSource.paginator = this.paginator;
    this.roleSource.sort = this.sort;
  }


  public filterRoleName(roleName: string) {
    this.roleSource.filterPredicate = function (role: Role, filter: string): boolean {
      return role.name.toLowerCase().includes(filter);
    };
    this.roleSource.filter = roleName.trim().toLowerCase();
  }


  openDeleteRole = (role: Role) => {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      data: {
        message: ` - ${role.displayName}`,
      },
      maxHeight: '80vh',
    }

    this.dialog.open(ConfirmDialogComponent, config).afterClosed().subscribe(((isDeleted: boolean) => {
      if (isDeleted) {
        this._permissionService.deleteRoleAdmin(role.id).subscribe(
          (response: ResponseApi<string[]>) => {
            if (1 !== response.result) {
              this._permissionService.openNotify(-1, response.message);
              return;
            }

            this._permissionService.openNotify(1, response.message);
            this.reloadRoleData();
          },
          (error) => {
            this._permissionService.openNotify(-1, 'Xóa vai trò thất bại');
          }
        );
      }
    }));
  }

  openUpdateRole = (role: Role) => {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      data: {
        role: role
      },
      maxHeight: '80vh',
    }

    this.dialog.open(UpdateRoleComponent, config).afterClosed().subscribe(((isUpdated: boolean) => {
      if (isUpdated) {
        this.reloadRoleData();
      }
    }));

  }

  openCreateRole = () => {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      data: {

      },
      maxHeight: '80vh',
    }


    this.dialog.open(CreateRoleComponent, config).afterClosed().subscribe(((isCreated: boolean) => {
      if (isCreated) {
        this.reloadRoleData();
      }
    }));
  }

  reloadRoleData = () => this.getRolesAdmin();
}
