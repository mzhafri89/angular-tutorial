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
  // * Exports CommonModule so that other module that imports shared module have access
  // * and doesnt need to import it once more
  exports: [CommonModule, HeaderComponent, DropdownDirective, AlertComponent],
  //providers: [],
  // * share module should not register any services if other module
  // * is importing it, doing so would cause diff instance of service would be provided to
  // * a lazy loaded module.
})
export class ShareModule {}
