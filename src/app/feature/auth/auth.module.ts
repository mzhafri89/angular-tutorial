import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLandingComponent } from './pages/auth-landing/auth-landing.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthLandingComponent],
  imports: [CommonModule, FormsModule],
})
export class AuthModule {}
