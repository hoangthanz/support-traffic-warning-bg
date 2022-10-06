import { Component } from '@angular/core';
import {AuthenticationService} from "../../../core/guards/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(
    private authenService: AuthenticationService,
    private router: Router
  ) { }

  logout() {
    this.authenService.logout();
  }
}
