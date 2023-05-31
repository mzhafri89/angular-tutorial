import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import User from 'src/app/core/models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.css'],
})
export class AuthLandingComponent {
  @ViewChild('form') form: NgForm;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  toggleLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit() {
    const {
      value: { email, password },
    } = this.form;

    this.isLoading = true;

    const user = new User(email, password);

    const complete = () => {
      this.isLoading = false;
      this.form.reset();
    };

    const error = (error) => {
      console.error(error);
      this.isLoading = false;
      this.errorMessage = error.message;
    };

    const next = () => this.router.navigate(['/recipes']);

    if (this.isLoginMode) {
      //login
      this.authService.login(user).subscribe({
        next,
        error,
        complete,
      });
    } else {
      //register
      this.authService.register(user).subscribe({
        next,
        error,
        complete,
      });
    }
  }

  dismissErrorMessage() {
    this.errorMessage = null;
  }
}
