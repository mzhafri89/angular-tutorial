import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { ItemComponent } from './components/item/item.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ShareModule } from 'src/app/share/share.module';
import { StartComponent } from './components/start/start.component';
import { EditComponent } from './components/edit/edit.component';
import { RecipeRouterModule } from './recipe-router.module';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    ItemComponent,
    LandingComponent,
    StartComponent,
    EditComponent,
  ],
  imports: [ReactiveFormsModule, RecipeRouterModule, ShareModule],
  exports: [],
})
export class RecipeModule {}
