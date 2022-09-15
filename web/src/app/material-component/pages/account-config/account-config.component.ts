import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from 'src/app/shared/models/user';
import {UserService} from '../../services/user/user.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUserComponent} from "../../components/create-user/create-user.component";

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.css']
})
export class AccountConfigComponent implements AfterViewInit {
  displayedColumns: string[] = ['index', 'userName', 'roleName', 'controls'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  user: User[] = [];
  constructor(
    private _userService: UserService,
    public dialog: MatDialog,
  ) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.getUserByGateId(0);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateUser = () => {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      maxHeight: '80vh',
    }
    this.dialog.open(CreateUserComponent, config).afterClosed().subscribe(((isCreated: boolean) => {
      if (isCreated) {
        this.getUserByGateId(0);
      }
    }));
  }

  getUserByGateId = (gateId: number) => {
    this._userService.GetUserByGateId(gateId).subscribe(res => {
      this.user = res.data;
      this.dataSource = new MatTableDataSource(this.user);
    }, error => {

    });
  }
}
