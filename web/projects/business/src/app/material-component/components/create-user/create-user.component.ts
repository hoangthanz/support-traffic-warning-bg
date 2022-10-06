import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {Role} from "../../models/role";
import {UserService} from "../../services/user/user.service";
import {ResponseApi} from "../../../core/models/response-api";
@Component({
  selector: 'account-dialog',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @ViewChild('userAccountForm') userAccountForm!: FormGroupDirective;

  public accountForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      roleIds: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/((09|03|07|08|05)+([0-9]{8,})\b)/), Validators.minLength(10), Validators.maxLength(10)])
    }
  );

  public selectedRole: Role = new Role();
  public selectedRoleId: string ="";
  public roles: Role[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _dialogRef: MatDialogRef<CreateUserComponent>,
    public router: Router,
    public dialog: MatDialog,
    private _accountService: UserService
  ) {
  }

  ngOnInit() {
    this.getAllRole();
  }

  public changeRole(role: any){
    this.selectedRoleId = role;
  }

  getAllRole(){
    this._accountService.getRoleAdmin().subscribe(
      (response: ResponseApi<any>) => {
        if (1 !== response.result) {
          this.roles = [];
          return;
        }
        this.roles = <any>response.data;
        this.selectedRole = this.data.selectedRole ?? this.roles[0];
        this.selectedRoleId = this.selectedRole.id;
        this.accountForm.controls.roleIds.setValue(this.selectedRole.id);
      },
      (error) => {
        this.roles = [];
      }
    );
  }

  createAccount = () => {

    if (this.accountForm.value.password !== this.accountForm.value.confirmPassword)
      return;

    let account = (this.accountForm.value);

    if (this.accountForm.invalid) {
      return;
    }
    account.roleIds = [];
    account.roleIds.push(this.selectedRoleId);

    this._accountService.createUserAccount(account).subscribe(
      (response: ResponseApi<string>) => {
        if (1 !== response.result) {
          this._accountService.openNotify(-1, response.message);
          return;
        }

        this._accountService.openNotify(1, response.message);

        this._dialogRef.close({selectedRole:this.selectedRole, isCreated: true});
      },
      (error) => {
        this._accountService.openNotify(-1, 'Có lỗi xảy ra');
      }
    );
  }
}
