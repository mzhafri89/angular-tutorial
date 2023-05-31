import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AuthModule } from '../feature/auth/auth.module';

@NgModule({
  declarations: [HeaderComponent, DropdownDirective],
  //needs to import router module for router directive to work
  imports: [CommonModule, RouterModule, HttpClientModule, AuthModule],
  exports: [HeaderComponent, DropdownDirective],
})
export class ShareModule {}
