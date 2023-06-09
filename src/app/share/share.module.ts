import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [HeaderComponent, DropdownDirective, AlertComponent],
  //needs to import router module for router directive to work
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [HeaderComponent, DropdownDirective, AlertComponent],
})
export class ShareModule {}
