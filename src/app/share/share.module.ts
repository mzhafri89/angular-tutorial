import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, DropdownDirective],
  //needs to import router module for router directive to work
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, DropdownDirective],
})
export class ShareModule {}
