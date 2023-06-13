import { NgModule, inject } from '@angular/core';
import {
  CanActivateFn,
  ResolveFn,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';

import { DataStoreService } from '../../share/services/data-store.service';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { AuthService } from '../auth/services/auth.service';
import { Recipe } from './models/recipe.model';
import { DetailComponent } from './components/detail/detail.component';
import { StartComponent } from './components/start/start.component';
import { EditComponent } from './components/edit/edit.component';
import { LandingComponent } from './pages/landing/landing.component';

//probably each data struct service need one for initing pages.
const recipesResolver: ResolveFn<Recipe[]> = () =>
  inject(DataStoreService).getRecipes();

const authGuard: CanActivateFn = () =>
  inject(AuthGuardService).canActivate(inject(AuthService), inject(Router));

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [authGuard],
    resolve: { recipes: recipesResolver },
    children: [
      { path: '', component: StartComponent, pathMatch: 'full' },
      //route with static resource should be plced on top of dynamic one
      {
        path: 'new',
        component: EditComponent,
        data: { mode: 'create' },
      },
      {
        path: ':id',
        component: DetailComponent,
      },
      {
        path: ':id/edit',
        component: EditComponent,
        data: { mode: 'update' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRouterModule {}
