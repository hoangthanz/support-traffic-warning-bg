import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { CuGateConfigComponent } from '../../components/cu-gate-config/cu-gate-config.component';
import {ConfigService} from "../../services/config.service";
import {ResponseApi} from "../../models/response-api";
import {ResponseGetProvincesModel} from "../../models/gate-config/response-get-provinces.model";
import {ResposeGetGateModel} from "../../models/gate-config/respose-get-gate.model";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-gate-config',
  templateUrl: './gate-config.component.html',
  styleUrls: ['./gate-config.component.css']
})
export class GateConfigComponent implements OnInit {

  nameSearch = ''
  public pageNumber = 0;
  provincesList: ResponseGetProvincesModel[] = [];
  listGate: ResposeGetGateModel[] = [];

  public gateTitleColumns: string[] = ['index', 'name', 'code', 'status', 'createDate', 'updateDate', 'description', 'edit'];
  public gateSource = new MatTableDataSource<any>();

  @ViewChild('paginator') paginator: MatPaginator | any;

  @ViewChild(MatSort, { static: true }) sort: MatSort | any;

  public length: number = 0;
  public totalLength: number = 0;
  public pageSize: number = 20;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    public dialog: MatDialog,
    private _configService: ConfigService
  ) {
  }

  ngOnInit() {
  }


  search = () => {
    this._configService.getGate().subscribe(
      (res: ResponseApi<ResposeGetGateModel[]>) => {
        if(1 !== res.result){
          return;
        }
        this.listGate = res.data;
        this.setSourceData(this.listGate);
      },error => {
        this.listGate = [];
      }
    )
  };

  public applyNameFilter = (filterString: string) => {
    this.nameSearch = filterString;
    if (this.nameSearch == "" ) this.search();
  }

  public paginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    let condition: any = {
      isPaging: true,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }
  }

  private setSourceData(data: any[]) {
    this.gateSource = new MatTableDataSource<any>(data);
    this.gateSource.sort = this.sort;
  }

  public changeStatus(gate: any, event: MatSlideToggleChange) {
    // gate.status = !gate.status;
    // this.categoryService.putGateCatalog(gate.id, gate).subscribe((result: ResponseApi<Gate>) => {
    //   if (result.result === 1) {
    //     this.openNotify(1, this.getSentence('successChangeStatus.mes'));
    //     this.search();
    //   }
    //   else this.openNotify(-1, this.getSentence('errorWhenChangeStats.mes'));
    // }, error => {
    //   this.openNotify(-1, this.getSentence('errorWhenChangeStats.mes'));
    // });
  }

  public openAddGateDialog = () => {
    const config: MatDialogConfig = {
      data: {
        provinces: this.provincesList,
        isCreate: true
      },
      panelClass: "dialog-responsive-40",
      maxHeight: '80vh',
    }
    this.dialog.open(CuGateConfigComponent, config).afterClosed().subscribe(data => {
      if (data) {
        this.search();
      }
    });
  }

  public openUpdateGateDialog = async (element: ResposeGetGateModel) => {
    const config: MatDialogConfig = {
      data: {
        provinces: this.provincesList,
        dataUpdate: element,
        isCreate: false
      },
      panelClass: "dialog-responsive-40",
      maxHeight: '80vh',
    }
    this.dialog.open(CuGateConfigComponent, config).afterClosed().subscribe(data => {
      if (data) {
        this.search();
      }
    });
  }

  getProvincesInfo = () => {
    this._configService.getProvincesInfo().subscribe(
      (res: ResponseApi<ResponseGetProvincesModel[]>) => {
        if (res.result !== 1){
          this.provincesList = [];
          return;
        }
        this.provincesList = res.data;
      }, error => {
        this.provincesList = [];
      }
    )
  }

  deleteGate = (element: any) => {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      data: {
        message: "Bạn chắc chắn muốn xóa cửa khẩu đối với người dùng: " + `${element.name}`,
        matTooltip: "Xóa cửa khẩu",
        matTooltipPosition: 'below',
        colorOK: 'accent',
        colorCancel: 'white'
      },
    }

    this.dialog.open(ConfirmDialogComponent, config).afterClosed().subscribe(result => {
      if(result){
        this._configService.deleteGate(element.id).subscribe(
          (res:ResponseApi<ResposeGetGateModel>) => {
            if(1 !== res.result){
              this._configService.openNotify(-1, res.message);
            }
            this._configService.openNotify(1, "Xóa cửa khẩu thành công");
            this.search();
          },error => {
            this._configService.openNotify(-1, "Xóa cửa khẩu thất bại");
          })

      }
    })
  }

  removeGate = (element: any) => {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      data: {
        message: "Bạn chắc chắn muốn xóa cửa khẩu đối với hệ thống: " + `${element.name}`,
        matTooltip: "Xóa cửa khẩu",
        matTooltipPosition: 'below',
        colorOK: 'accent',
        colorCancel: 'white'
      },
    }

    this.dialog.open(ConfirmDialogComponent, config).afterClosed().subscribe(result => {
      if(result){
        this._configService.removeGate(element.id).subscribe(
          (res:ResponseApi<ResposeGetGateModel>) => {
            if(1 !== res.result){
              this._configService.openNotify(-1, res.message);
            }
            this._configService.openNotify(1, "Xóa cửa khẩu thành công");
            this.search();
          },error => {
            this._configService.openNotify(-1, "Xóa cửa khẩu thất bại");
          })

      }
    })
  }



}
