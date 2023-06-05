import User from '../models/user.model';

export default interface AuthenticatedUser extends User {
  getAccessToken: () => string;
  getRefreshToken: () => string;
  getTokenExpiryDate: () => Date;
}
