import {Component, OnInit} from '@angular/core';
import {LoginModel} from "../../../shared/models/login-model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public hide = true;

  public user: LoginModel = new LoginModel();

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _userService: UserService
  ) {

    let loadingRegister = <boolean><unknown>localStorage.getItem('loading_register');

    if (!loadingRegister)
      return;

    let username = localStorage.getItem('user_name_register')?.toString();
    let password = localStorage.getItem('password_register')?.toString();

    if (null != username) {
      this.user.userName = username ?? this.user.userName;
      this.user.password = password ?? this.user.password;
    }

  }

  ngOnInit() {
  }


  public openSnackBar(message: string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }


  public goToNav = (url: string) => this._router.navigate([`/${url}`]);


  public loginUser = () => {
    this._userService.Login(this.user.userName, this.user.password).subscribe((response: any) => {
      // khi đăng nhập thành công...
      //lưu token vào trong localStorage với key là access_token
      sessionStorage.setItem('access_token', response.token);
      localStorage.setItem('access_token', response.token);
      this.openSnackBar('Đăng nhập thành công!');
      this.goToNav('');

    }, (error) => {
      // lỗi thì làm gì?
      this.openSnackBar('Đăng nhập không thành công!');
    })
  };

}
