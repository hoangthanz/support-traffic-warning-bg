import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfigService} from "../../services/config.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResponseApi} from "../../models/response-api";
import {ResposeGetGateModel} from "../../models/gate-config/respose-get-gate.model";
import {RequestCreateStationModel} from "../../models/station-config/request-create-station.model";

@Component({
  selector: 'app-cu-station-config',
  templateUrl: './cu-station-config.component.html',
  styleUrls: ['./cu-station-config.component.css']
})
export class CuStationConfigComponent implements OnInit {
  isCreate = true;
  selectedValue = '';

  public stationForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/((09|03|07|08|05)+([0-9]{8,})\b)/), Validators.minLength(10), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.email]),
    website: new FormControl(),
    latitude: new FormControl(null, [Validators.required]),
    longitude: new FormControl(null, [Validators.required]),
    description: new FormControl(),
    status: new FormControl(),
    gateId: new FormControl(null, [Validators.required])
  });
  public isChecked = true;

  listGate: ResposeGetGateModel[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CuStationConfigComponent>,
    private _configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.isCreate = this.data.isCreate;
    if (!this.isCreate){
      this.isChecked = this.data.updateData.status;
      this.stationForm.controls['name'].setValue(this.data.updateData.name);
      this.stationForm.controls['address'].setValue(this.data.updateData.address);
      this.stationForm.controls['phone'].setValue(this.data.updateData.phone);
      this.stationForm.controls['email'].setValue(this.data.updateData.email);
      this.stationForm.controls['website'].setValue(this.data.updateData.website);
      this.stationForm.controls['latitude'].setValue(this.data.updateData.latitude);
      this.stationForm.controls['longitude'].setValue(this.data.updateData.longitude);
      this.stationForm.controls['description'].setValue(this.data.updateData.description);
      this.stationForm.controls['gateId'].setValue(this.data.updateData.gateId);
      this.stationForm.controls['status'].setValue(this.data.updateData.status);
    }
    this.getGate();
  }

  submit = () => {
    if(this.stationForm.invalid){
      this._configService.openNotify(1, "Vui lòng kiểm tra lại thông tin trạm");
      return;
    }

    const requestCreateStation: RequestCreateStationModel = this.stationForm.value;
    if(this.isCreate){
      requestCreateStation.status = true;
      this._configService.createStation(requestCreateStation).subscribe(
        (res: ResponseApi<any>) => {
          if(1 !== res.result){
            this._configService.openNotify(-1, res.message);
            return;
          }
          this._configService.openNotify(-1, "Thêm trạm thành công");
          this.dialogRef.close(true);
        },() => {
          this._configService.openNotify(-1, "Thêm trạm thất bại");
        })
    }
    else{
      requestCreateStation.id = this.data.updateData.id;
      requestCreateStation.status = this.isChecked;
      this._configService.updateStation(this.data.updateData.id,requestCreateStation).subscribe(
        (res: ResponseApi<any>) => {
          if (1 !== res.result){
            this._configService.openNotify(-1, res.message);
            return;
          }
          this._configService.openNotify(-1, "Cập nhật trạm thành công");
          this.dialogRef.close(true);
        },() => {
          this._configService.openNotify(-1, "Cập nhật trạm thất bại");
        }
      )
    }
  }

  getGate = () => {
    this._configService.getGate().subscribe(
      (res: ResponseApi<ResposeGetGateModel[]>) => {
        if(1 !== res.result){
          this.listGate = [];
          return;
        }
        this.listGate = res.data;
      },error => {
        this.listGate = [];
      }
    )
  }



  public numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = event.which ? event.which : event.keyCode;

    if (46 == charCode) {
      return true;
    }

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
