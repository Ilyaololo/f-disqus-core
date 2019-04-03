export class UserRecord {
  public readonly sid: string;
  public readonly login: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly middleName: string;

  constructor(params: any) {
    this.sid = params.sid;
    this.login = params.login;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.middleName = params.middleName;
  }
}
