import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ResponseApi} from "../../../../core/models/response-api";
import {ConfigService} from "../../../services/config.service";
import {ResposeGetGateModel} from "../../../models/gate-config/respose-get-gate.model";

@Component({
  selector: 'update-level',
  templateUrl: './update-gate-level.component.html',
  styleUrls: ['./update-gate-level.component.css']
})
export class UpdateGateLevelComponent {

  public roleForm: FormGroup = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      gateId: new FormControl(0, [Validators.required]),
      levelId: new FormControl(0, [Validators.required]),
      minValue: new FormControl(0, [Validators.required]),
      maxValue: new FormControl(0, [Validators.required]),
    }
  );
  listGate: ResposeGetGateModel[] = [];
  listLevel: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _dialogRef: MatDialogRef<UpdateGateLevelComponent>,
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

  ngOnInit() {
    this.roleForm = new FormGroup({
        id: new FormControl(this.data?.role?.id, [Validators.required]),
        gateId: new FormControl(this.data?.role?.gateId, [Validators.required]),
        levelId: new FormControl(this.data?.role?.levelId, [Validators.required]),
        minValue: new FormControl(this.data?.role?.minValue, [Validators.required]),
        maxValue: new FormControl(this.data?.role?.maxValue, [Validators.required]),
      });
  }

  updateGateLevel = () => {
    const updateGateLevel = this.roleForm.value;
    const id: number = this.data.role.id;
    if (this.roleForm.invalid) {
      return;
    }
    this._permissionService.updateGateLevel(id, updateGateLevel).subscribe(
      () => {
        this._permissionService.openNotify(1, 'Cập nhật thành công');
        this._dialogRef.close(true);
      },
      () => {
        this._permissionService.openNotify(-1, 'Can not update role');
      }
    );
  }
}
