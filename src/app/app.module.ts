import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { RecipeModule } from './feature/recipe/recipe.module';
import { ShoppingListModule } from './feature/shopping-list/shopping-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ShareModule, RecipeModule, ShoppingListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
