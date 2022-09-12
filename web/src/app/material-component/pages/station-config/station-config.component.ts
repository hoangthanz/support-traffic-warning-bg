import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ConfigService} from "../../services/config.service";
import {ResponseApi} from "../../models/response-api";
import {ResponseGetStationModel} from "../../models/station-config/response-get-station.model";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CuStationConfigComponent} from "../../components/cu-station-config/cu-station-config.component";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-station-config',
  templateUrl: './station-config.component.html',
  styleUrls: ['./station-config.component.css']
})
export class StationConfigComponent implements OnInit {
  nameSearch = ''
  public pageNumber = 0;

  public stationTitleColumns: string[] = ['index', 'name', 'adddress','phone','email','website','coordinates', 'status', 'createDate', 'updateDate', 'description', 'edit'];
  public stationSource = new MatTableDataSource<any>();

  public length: number = 0;
  public totalLength: number = 0;
  public pageSize: number = 20;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  listStation: ResponseGetStationModel[] = [];

  @ViewChild('paginator') paginator: MatPaginator | any;

  @ViewChild(MatSort, { static: true }) sort: MatSort | any;

  constructor(
    public dialog: MatDialog,
    private _configService: ConfigService
  ) { }

  ngOnInit(): void {
  }

  search = () => {
    this._configService.getStation().subscribe(
      (res: ResponseApi<ResponseGetStationModel[]>) => {
        if(1 !== res.result){
          this.listStation = [];
          return;
        }
        this.listStation = res.data;
        this.setSourceData(this.listStation);
      },error => {
        this.listStation = [];
      }
    )
  }

  private setSourceData(data: any[]) {
    this.stationSource = new MatTableDataSource<any>(data);
    this.stationSource.sort = this.sort;
  }

  public applyNameFilter = (filterString: string) => {
    this.nameSearch = filterString;
    if (this.nameSearch == "" ) this.search();
  }

  public changeStatus(gate: any, event: MatSlideToggleChange) {}

  public paginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    let condition: any = {
      isPaging: true,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }
  }

  openCreateStationDialog = () => {
    const config: MatDialogConfig = {
      data: {
        isCreate: true
      },
      panelClass: "dialog-responsive-30",
      maxHeight: '80vh',
    }
    this.dialog.open(CuStationConfigComponent, config).afterClosed().subscribe(data => {
      if (data) {
        this.search();
      }
    });
  }

  deleteStation = (element: any) => {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      data: {
        message: "Bạn chắc chắn muốn xóa trạm: " + `${element.name}`,
        matTooltip: "Xóa trạm",
        matTooltipPosition: 'below',
        colorOK: 'accent',
        colorCancel: 'white'
      },
    }

    this.dialog.open(ConfirmDialogComponent, config).afterClosed().subscribe(result => {
      if(result){
        this._configService.deleteStation(element.id).subscribe(
          (res:ResponseApi<ResponseGetStationModel>) => {
            if(1 !== res.result){
              this._configService.openNotify(-1, res.message);
            }
            this._configService.openNotify(1, "Xóa trạm thành công");
            this.search();
          },error => {
            this._configService.openNotify(-1, "Xóa trạm thất bại");
          })

      }
    })
  }

  openUpdateStationDialog = (element: any) => {
    const config: MatDialogConfig = {
      data: {
        updateData: element,
        isCreate: false
      },
      panelClass: "dialog-responsive-30",
      maxHeight: '80vh',
    }
    this.dialog.open(CuStationConfigComponent, config).afterClosed().subscribe(data => {
      if (data) {
        this.search();
      }
    });
  }

}
