import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ResponseApi} from "../../../../core/models/response-api";
import {ConfigService} from "../../../services/config.service";
import {ResposeGetGateModel} from "../../../models/gate-config/respose-get-gate.model";

@Component({
  selector: 'create-level',
  templateUrl: './create-gate-level.component.html',
  styleUrls: ['./create-gate-level.component.css']
})
export class CreateGateLevelComponent {

  public roleForm: FormGroup = new FormGroup({
    gateId: new FormControl(0, [Validators.required]),
    levelId: new FormControl(0, [Validators.required]),
    minValue: new FormControl(0, [Validators.required]),
    maxValue: new FormControl(0, [Validators.required]),
  });
  listGate: ResposeGetGateModel[] = [];
  listLevel: any = [];

  constructor(
    private _dialogRef: MatDialogRef<CreateGateLevelComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: ConfigService,
  ) {
    this.getGate();
    this.getLevel();
  }

  getGate = () => {
    this._permissionService.getGate().subscribe(
      (res: ResponseApi<ResposeGetGateModel[]>) => {
        if (1 !== res.result) {
          this.listGate = [];
          return;
        }
        this.listGate = res.data;
      }, () => {
        this.listGate = [];
      }
    )
  }
  getLevel = () => {
    this._permissionService.getLevel().subscribe(
      (res: ResponseApi<any>) => {
        if (1 !== res.result) {
          this.listLevel = [];
          return;
        }
        this.listLevel = res.data;
      }, () => {
        this.listLevel = [];
      }
    )
  }
  createGateLevel = () => {
    const role = this.roleForm.value;
    this._permissionService.createGateLevel(role).subscribe(
      (response: any) => {
        this._permissionService.openNotify(1, 'Thêm mới thành công');
        this._dialogRef.close(true);
      },
      () => {
        this._permissionService.openNotify(-1, 'Có lỗi xảy ra');
      }
    );
  }
}
