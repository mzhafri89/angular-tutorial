import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './components/edit/edit.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditComponent, LandingComponent],
  imports: [CommonModule, FormsModule],
  exports: [LandingComponent],
})
export class ShoppingListModule {}
