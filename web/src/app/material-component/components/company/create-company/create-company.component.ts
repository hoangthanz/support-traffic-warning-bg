import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConfigService} from "../../../services/config.service";
import {ResponseApi} from "../../../../core/models/response-api";
import {ResposeGetGateModel} from "../../../models/gate-config/respose-get-gate.model";

@Component({
  selector: 'create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {

  public companyForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      taxCode: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
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
    private _dialogRef: MatDialogRef<CreateCompanyComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: ConfigService,
  ) {
  }


  createRole = () => {
    const role = this.companyForm.value;
    this._permissionService.createCompany(role).subscribe(
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
