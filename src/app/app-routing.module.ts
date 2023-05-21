import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent as RecipeLandingComponent } from './feature/recipe/pages/landing/landing.component';
import { LandingComponent as ShoppingListLandingComponent } from './feature/shopping-list/pages/landing/landing.component';
import { EditComponent } from './feature/shopping-list/components/edit/edit.component';
import { DetailComponent as RecipeDetailComponent } from './feature/recipe/components/detail/detail.component';
import { ErrorComponent } from './share/pages/error/error.component';

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
    children: [
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: EditComponent },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListLandingComponent,
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
