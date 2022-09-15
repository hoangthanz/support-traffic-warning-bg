import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {ResponseApi} from "../../../core/models/response-api";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {ConfigService} from "../../services/config.service";
import {CreateLevelComponent} from "../../components/level/create-level/create-level.component";
import {UpdateLevelComponent} from "../../components/level/update-level/update-level.component";

@Component({
  selector: 'lsn-role-page',
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.css']
})
export class LevelPageComponent implements OnInit {

  roleColumns: string[] = ['index', 'displayName', 'name', 'normalizedName', 'controls'];
  roleSource = new MatTableDataSource<any>([]);

  roles: any = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private _levelService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.getRolesAdmin();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.roleColumns, event.previousIndex, event.currentIndex);
  }

  getRolesAdmin = () => this._levelService.getLevel().subscribe(
    (response: any) => {

      // if (1 !== response.result) {
      //   this.roles = [];
      //   this.setRoleSource(this.roles);
      //   return;
      // }
      this.roles = response;
      let i = 1;
      this.roles.forEach((item: any) => {
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

  setRoleSource = (roles:any) => {
    this.roleSource = new MatTableDataSource<any>(roles);
    this.roleSource.paginator = this.paginator;
    this.roleSource.sort = this.sort;
  }


  public filterRoleName(roleName: string) {
    this.roleSource.filterPredicate = function (role: any, filter: string): boolean {
      return role.name.toLowerCase().includes(filter);
    };
    this.roleSource.filter = roleName.trim().toLowerCase();
  }


  openDeleteRole = (role: any) => {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      data: {
        message: ` - ${role.displayName}`,
      },
      maxHeight: '80vh',
    }

    this.dialog.open(ConfirmDialogComponent, config).afterClosed().subscribe(((isDeleted: boolean) => {
      if (isDeleted) {
        this._levelService.deleteLevel(role.id).subscribe(
          (response: ResponseApi<string[]>) => {
            if (1 !== response.result) {
              this._levelService.openNotify(-1, response.message);
              return;
            }

            this._levelService.openNotify(1, response.message);
            this.reloadRoleData();
          },
          (error) => {
            this._levelService.openNotify(-1, 'Xóa vai trò thất bại');
          }
        );
      }
    }));
  }

  openUpdateRole = (role: any) => {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      data: {
        role: role
      },
      maxHeight: '80vh',
    }

    this.dialog.open(UpdateLevelComponent, config).afterClosed().subscribe(((isUpdated: boolean) => {
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


    this.dialog.open(CreateLevelComponent, config).afterClosed().subscribe(((isCreated: boolean) => {
      if (isCreated) {
        this.reloadRoleData();
      }
    }));
  }

  reloadRoleData = () => this.getRolesAdmin();
}
