export class UserToken {
  token: string;
  expiration: string;
  refreshToken: string;
  listClaims: string[];

  constructor(token: string = '', refreshToken: string = '', expiration: string = '') {
    this.token = token;
    this.expiration = expiration;
    this.refreshToken = refreshToken;
    this.listClaims = [];
  }
}
