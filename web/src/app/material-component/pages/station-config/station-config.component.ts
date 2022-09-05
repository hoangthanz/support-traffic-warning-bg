import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {PageEvent} from "@angular/material/paginator";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-station-config',
  templateUrl: './station-config.component.html',
  styleUrls: ['./station-config.component.css']
})
export class StationConfigComponent implements OnInit {
  nameSearch = ''
  public pageNumber = 0;

  public stationTitleColumns: string[] = ['index', 'name', 'code', 'status', 'createDate', 'updateDate', 'description', 'edit'];
  public stationSource = new MatTableDataSource<any>();

  public length: number = 0;
  public totalLength: number = 0;
  public pageSize: number = 20;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private _configService: ConfigService
  ) { }

  ngOnInit(): void {
  }

  search = () => {}

  public applyNameFilter = (filterString: string) => {
    this.nameSearch = filterString;
    if (this.nameSearch == "" ) this.search();
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

  public paginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    let condition: any = {
      isPaging: true,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }
  }

}
