import AuthenticatedUser from '../interfaces/authenticated-user.interface';
import User from './user.model';

export default class FirebaseUser extends User implements AuthenticatedUser {
  private accessToken: string | undefined;
  private refreshToken: string | undefined;
  private tokenExpiryDate: Date | undefined;
  private registered = false;

  constructor(email, password, private returnSecureToken: boolean) {
    super(email, password);
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getAccessToken() {
    if (!this.accessToken || new Date() > this.tokenExpiryDate) {
      return null;
    }

    return this.accessToken;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  setTokenExpiryDate(tokenExpiryDate: Date) {
    this.tokenExpiryDate = tokenExpiryDate;
  }

  getTokenExpiryDate() {
    return this.tokenExpiryDate;
  }

  getReturnSecureToken() {
    this.returnSecureToken;
  }

  setRegistered(registered: boolean) {
    this.registered = registered;
  }

  getRegistered() {
    return this.registered;
  }
}
