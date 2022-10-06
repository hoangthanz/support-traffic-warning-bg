import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {ConfigService} from "../../services/config.service";
import {SearchCondition} from "../../models/search";
import {ResponseApi} from "../../../core/models/response-api";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {CreateCompanyComponent} from "../../components/company/create-company/create-company.component";
import {UpdateCompanyComponent} from "../../components/company/update-company/update-company.component";

@Component({
  selector: 'company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {
  public codeGood = "";
  public nameGood = "";
  public searchCondition: SearchCondition = {
    isPaging: true,
    pageNumber: 1,
    pageSize: 10
  };
  public goodsSource = new MatTableDataSource<any>();
  public goods: any[] = [];
  public goodTitleColumns: string[] = ['index', 'name', 'code','taxCode','phone','address', 'createDate', 'updateDate', 'edit'];
  public pageSizeOptions: number[] = [10, 25, 100];
  public pageSize = 10;
  public length = 0;
  public pageNumber = 1;

  public gates: any[] = [];
  public gateId: string;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private categoryService: ConfigService,
    public router: Router,
    public dialog: MatDialog,
  ) {
    this.gateId = '';
    this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
    this.sort = new MatSort();
  }

  ngOnInit(): void {
    this.search();
  }

  getGoodsArea(condition: SearchCondition) {
    condition.code = this.codeGood;
    condition.name = this.nameGood;
    this.categoryService.getCompany(this.toSearchString(condition))
      .subscribe((response: ResponseApi<any>) => {
        if (response?.result === 1) {
          this.length = response?.pagingResponse?.totalRecords;
          this.goods = response.data;
          this.setSourceData(this.goods);
        } else {
          this.goods = [];
          this.setSourceData([]);
        }
      }, error => {
        this.goods = [];
        this.setSourceData([]);
      });
  }

  openAddGoodsAreaDialog() {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-40",
    }
    this.dialog.open(CreateCompanyComponent, config).afterClosed().subscribe(data => {
      if (data) {
        this.getGoodsArea(this.searchCondition)

      }
    });
  }

  deleteGoodsArea(element: any) {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-30",
      data: {
        message: 'Xóa thông tin phuong tien' + ` ${element.licencePlate}`,
        matTooltipPosition: 'below',
        colorOK: 'accent',
        colorCancel: 'white',
      }
    }

    this.dialog.open(ConfirmDialogComponent, config).afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCompany(element.id).subscribe((data: ResponseApi<any>) => {
          if (data.result === 1) {
            this.categoryService.openNotify(1, data.message);
            this.getGoodsArea(this.searchCondition);
          } else this.categoryService.openNotify(-1, data.message);
        }, error => {
          this.categoryService.openNotify(-1, 'Có lỗi trong quá trình xử lý');
        });
      }
    });
  }

  openUpdateGoodsAreaDialog(element: any) {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive-40",
      data: element
    }
    this.dialog.open(UpdateCompanyComponent, config).afterClosed().subscribe(data => {
      if (data) {
        this.getGoodsArea(this.searchCondition)
      }
    });
  }

  search() {
    this.searchCondition = {
      isPaging: true,
      pageNumber: 1,
      pageSize: this.pageSize,
    };
    this.getGoodsArea(this.searchCondition);
  }

  reload() {
    this.searchCondition = {
      isPaging: true,
      pageNumber: 1,
      pageSize: this.pageSize,
    };
    this.getGoodsArea(this.searchCondition)
  }

  public paginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    const condition: SearchCondition = {
      isPaging: true,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }
    this.getGoodsArea(condition);
  }

  toSearchString(condition: SearchCondition) {
    let conditionString = "";
    conditionString = Object.keys(condition).map(key => key + '=' + condition[key as keyof SearchCondition]).join('&')
    return conditionString.length > 0 ? "?" + conditionString : "";
  }


  private setSourceData(data: any) {
    this.goodsSource = new MatTableDataSource<any>(data);
    this.goodsSource.sort = this.sort;
  }
}
