import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EditComponent } from './components/edit/edit.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [EditComponent, LandingComponent],
  imports: [
    FormsModule,
    ShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingComponent,
      },
    ]),
  ],
  exports: [],
})
export class ShoppingListModule {}
