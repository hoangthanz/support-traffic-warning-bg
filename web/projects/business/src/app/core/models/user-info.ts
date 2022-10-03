export class UserInfor {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  emailConfirmed: boolean;
  createDate: string;
  updateDate: string;
  roles: any;

  constructor() {
    this.id = '';
    this.username = '';
    this.email = '';
    this.isActive = false;
    this.emailConfirmed = false;
    this.createDate = '';
    this.updateDate = '';
    this.roles = '';
  }
}
