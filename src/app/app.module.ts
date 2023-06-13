import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { RecipeModule } from './feature/recipe/recipe.module';
import { ShoppingListModule } from './feature/shopping-list/shopping-list.module';
import { AuthModule } from './feature/auth/auth.module';
import { AuthInterceptorService } from './feature/auth/services/auth-interceptor.service';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';

// ! Module is isolated from each other module by default
@NgModule({
  declarations: [AppComponent], // * array of components, pipe, directive to be used in this module
  imports: [
    // * array of other modules to be imported to this module, needs to be
    // * in a order of dependencies.
    BrowserModule, // * should only be imported once. other module should be importing CommonModule
    ShareModule,
    // * Feature modules
    //AuthModule, // * lazy loaded
    //RecipeModule, // * lazy loaded
    //ShoppingListModule, // * lazy loaded
    // ! this needs to be loaded last when there's a wildcard path + child router module
    CoreModule,
    RouterModule, // * still needed due tue <router-outlet> component
  ],
  providers: [
    // * aray of service that this module need
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent], // * define which component that would be load in index.html
})
export class AppModule {}
