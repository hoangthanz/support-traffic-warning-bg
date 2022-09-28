import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConfigService} from "../../../services/config.service";
import {ResponseApi} from "../../../../core/models/response-api";
import {ResposeGetGateModel} from "../../../models/gate-config/respose-get-gate.model";

@Component({
  selector: 'create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent {

  public vehicleForm: FormGroup = new FormGroup(
    {
      licencePlate: new FormControl('', [Validators.required]),
      weight: new FormControl(0, [Validators.required]),
      loadDueToOwnWeight: new FormControl(0, [Validators.required]),
      driverName: new FormControl('', [Validators.required]),
      driverPhone: new FormControl('', [Validators.required]),
      gateId: new FormControl(0, [Validators.required]),
      vehicleTypeId: new FormControl(0, [Validators.required]),
    }
  );
  vehicleTypeEnums = [
    {id: 0, name: 'Xe container'},
    {id: 1, name: 'Xe mooc'},
    {id: 2, name: 'Xe tải'},
    {id: 3, name: 'Xe thùng kín'},
    {id: 4, name: 'Ô tô tự hành'},
    {id: 5, name: 'Khác'},
  ];
  gates: any = [];

  constructor(
    private _dialogRef: MatDialogRef<CreateVehicleComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: ConfigService,
  ) {
    this.getGate();
  }

  getGate() {
    this._permissionService.getGate().subscribe(
      (res: ResponseApi<ResposeGetGateModel[]>) => {
        if (1 !== res.result) {
          return;
        }
        this.gates = res.data;
      }, error => {
        this.gates = [];
      }
    )
  };

  createRole = () => {
    const role = this.vehicleForm.value;
    this._permissionService.createVehicle(role).subscribe(
      (response: any) => {
        // if (1 !== response?.result) {
        //   this._permissionService.openNotify(-1, response.message);
        //   return;
        // }

        this._permissionService.openNotify(1, 'Thêm mới thành công');
        this._dialogRef.close(true);
      },
      (error) => {
        this._permissionService.openNotify(-1, 'Có lỗi xảy ra');
      }
    );
  }
}
