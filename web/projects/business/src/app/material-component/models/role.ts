export class Role {
  index: number;
  id: string;
  displayName: string;
  name: string;
  normalizedName: string;
  roleInGate: boolean;
  haveOTP: boolean;
  constructor(id: string = '', displayName: string = '', name: string = '', normalizedName: string = '', haveOTP: boolean = false) {
    this.id = id;
    this.displayName = displayName;
    this.name = name;
    this.normalizedName = normalizedName;
    this.index = 0;
    this.roleInGate = false;
    this.haveOTP = haveOTP;
  }
}
