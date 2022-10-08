
export class UpdateRole {
  displayName: string;
  listPermission: string[];
  haveOTP: boolean;
  roleInGate: boolean;
  constructor(displayName: string = '', listPermission: string[] = [], roleInGate: boolean = false, haveOTP: boolean = false) {
    this.displayName = displayName;
    this.listPermission = listPermission;
    this.roleInGate = roleInGate;
    this.haveOTP = haveOTP;
  }
}
