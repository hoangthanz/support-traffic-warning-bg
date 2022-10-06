export class Permission {
  displayName: string;
  name: string;
  permissions: any[];

  constructor(displayName: string = '', name: string = '') {
    this.displayName = displayName;
    this.name = name;
    this.permissions = [];
  }
}
