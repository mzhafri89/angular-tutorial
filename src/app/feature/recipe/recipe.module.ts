import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { ItemComponent } from './components/item/item.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ShareModule } from 'src/app/share/share.module';
import { StartComponent } from './components/start/start.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    ItemComponent,
    LandingComponent,
    StartComponent,
    EditComponent,
  ],
  imports: [CommonModule, ShareModule, RouterModule, ReactiveFormsModule],
  exports: [LandingComponent],
})
export class RecipeModule {}
