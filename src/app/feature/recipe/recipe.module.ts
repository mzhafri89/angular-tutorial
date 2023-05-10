import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { ItemComponent } from './components/item/item.component';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
  declarations: [ListComponent, DetailComponent, ItemComponent, LandingComponent],
  imports: [CommonModule],
  exports: [LandingComponent],
})
export class RecipeModule {}
