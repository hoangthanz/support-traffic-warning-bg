import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent {

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
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _dialogRef: MatDialogRef<UpdateVehicleComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.vehicleForm = new FormGroup(
      {
        id: new FormControl(this.data.vehicle.id, [Validators.required]),
        licencePlate: new FormControl(this.data.vehicle.licencePlate, [Validators.required]),
        weight: new FormControl(this.data.vehicle.weight, [Validators.required]),
        loadDueToOwnWeight: new FormControl(this.data.vehicle.loadDueToOwnWeight, [Validators.required]),
        driverName: new FormControl(this.data.vehicle.driverName, [Validators.required]),
        driverPhone: new FormControl(this.data.vehicle.driverPhone, [Validators.required]),
        gateId: new FormControl(this.data.vehicle.gateId, [Validators.required]),
        vehicleTypeId: new FormControl(this.data.vehicle.vehicleTypeId, [Validators.required]),
      }
    );
  }

  createRole = () => {
    const role = this.vehicleForm.value;
    const id: number = this.data.vehicle.id;
    if (this.vehicleForm.invalid) {
      return;
    }
    this._permissionService.updateVehicle(id, role).subscribe(
      (response: any) => {
        this._permissionService.openNotify(1, 'Cập nhật thành công');
        this._dialogRef.close(true);
      },
      (error) => {
        this._permissionService.openNotify(-1, 'Can not update role');
      }
    );
  }
}
