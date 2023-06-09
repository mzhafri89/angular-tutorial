import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthLandingComponent } from './pages/auth-landing/auth-landing.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [AuthLandingComponent],
  imports: [CommonModule, FormsModule, ShareModule],
  exports: [AuthLandingComponent],
})
export class AuthModule {}
