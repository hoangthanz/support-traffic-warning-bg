import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent {


  public companyForm: FormGroup = new FormGroup(
    {
      id: new FormControl('', [Validators.required]),
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
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _dialogRef: MatDialogRef<UpdateCompanyComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _permissionService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.companyForm = new FormGroup(
      {
        id: new FormControl(this.data.id, [Validators.required]),
        name: new FormControl(this.data.name, [Validators.required]),
        phone: new FormControl(this.data.phone, [Validators.required]),
        code: new FormControl(this.data.code, [Validators.required]),
        taxCode: new FormControl(this.data.taxCode, [Validators.required]),
        address: new FormControl(this.data.address, [Validators.required]),
        description: new FormControl(this.data.description, [Validators.required]),
      }
    );
  }

  createRole = () => {
    const role = this.companyForm.value;
    const id: number = this.data.vehicle.id;
    if (this.companyForm.invalid) {
      return;
    }
    this._permissionService.updateCompany(id, role).subscribe(
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
