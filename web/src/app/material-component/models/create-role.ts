export class CreateRole {
  name: string;
  displayName: string;
  roleInGate: boolean;
  listPermission: string[];

  constructor(name: string = '', displayName: string = '', listPermission: string[] = []) {
    this.name = name;
    this.displayName = displayName;
    this.listPermission = listPermission;
    this.roleInGate = false;
  }
}
