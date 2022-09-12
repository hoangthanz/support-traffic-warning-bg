export class User {
  isActive: boolean | undefined;
  activeCode: string | undefined;
  displayName: string | undefined;
  createdDate: string | undefined;
  updatedDate: string | undefined;
  isDeleted: boolean | undefined;
  status: boolean | undefined;
  gateId: number | undefined;
  id: number | undefined;
  userName: string | undefined;
  normalizedUserName: string | undefined;
  email: string | undefined;
  normalizedEmail: string | undefined;
  emailConfirmed: boolean | undefined;
  passwordHash: string | undefined;
  securityStamp: string | undefined;
  concurrencyStamp: string | undefined;
  phoneNumber: string | undefined;
  phoneNumberConfirmed: boolean | undefined;
  twoFactorEnabled: boolean | undefined;
  lockoutEnabled: boolean | undefined;
  accessFailedCount: number | undefined;
}

