export default class User {
  constructor(private email, private password) {}

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }
}
