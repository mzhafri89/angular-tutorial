import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LandingComponent as RecipeLandingComponent } from './feature/recipe/pages/landing/landing.component';
import { LandingComponent as ShoppingListLandingComponent } from './feature/shopping-list/pages/landing/landing.component';
import { DetailComponent as RecipeDetailComponent } from './feature/recipe/components/detail/detail.component';
import { ErrorComponent } from './share/pages/error/error.component';
import { StartComponent } from './feature/recipe/components/start/start.component';
import { EditComponent as RecipeEditComponent } from './feature/recipe/components/edit/edit.component';
import { Recipe } from './feature/recipe/models/recipe.model';
import { DataStoreService } from './share/services/data-store.service';
import { AuthLandingComponent } from './feature/auth/pages/auth-landing/auth-landing.component';

//probably each data struct service need one for initing pages.
const recipesResolver: ResolveFn<Recipe[]> = () =>
  inject(DataStoreService).getRecipes();

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
    //for root, need to change the path strat to full , since pre fix would match every path.
  },
  {
    path: 'recipes',
    component: RecipeLandingComponent,
    resolve: { recipes: recipesResolver },
    children: [
      { path: '', component: StartComponent, pathMatch: 'full' },
      //route with static resource should be plced on top of dynamic one
      { path: 'new', component: RecipeEditComponent, data: { mode: 'create' } },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        data: { mode: 'update' },
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListLandingComponent,
  },
  {
    path: 'auth',
    component: AuthLandingComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
