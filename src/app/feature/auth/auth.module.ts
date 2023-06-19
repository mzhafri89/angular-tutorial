import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { AuthLandingComponent } from './pages/auth-landing/auth-landing.component';
import { ShareModule } from 'src/app/share/share.module';
import authReducer from './store/auth.reducer';

@NgModule({
  declarations: [AuthLandingComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', { auth: authReducer }),
    FormsModule,
    ShareModule,
    RouterModule.forChild([{ path: '', component: AuthLandingComponent }]),
  ],
  exports: [],
})
export class AuthModule {}
