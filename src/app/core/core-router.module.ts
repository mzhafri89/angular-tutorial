import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from '../share/pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
    //for root, need to change the path strat to full , since pre fix would match every path.
  },
  {
    // * lazy loaded module
    path: 'auth',
    loadChildren: () =>
      import('../feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    // * lazy loaded module
    path: 'recipes',
    loadChildren: () =>
      import('../feature/recipe/recipe.module').then((m) => m.RecipeModule),
  },
  {
    // * lazy loaded module
    path: 'shopping-list',
    loadChildren: () =>
      import('../feature/shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  // * when the wildcard path is defined, this routing module needs to be the last one
  // * loaded to prevent other module route matches this wildcard routes
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' }), // * download module in bg
  ],
  exports: [RouterModule],
})
export class CoreRouterModule {}
