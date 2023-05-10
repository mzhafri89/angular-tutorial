import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ItemComponent } from './components/item/item.component';



@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    ItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RecipeModule { }
