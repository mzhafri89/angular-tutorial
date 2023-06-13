import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from 'src/app/share/models/ingredient.model';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';

//update the providedIn value if this module is later lazy loaded
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] | undefined;
  private recipeSubject: Subject<Recipe>;

  constructor(private shoppingListService: ShoppingListService) {
    this.recipes = [];
    this.recipeSubject = new Subject<Recipe>();
  }

  getRecipes() {
    return [...this.recipes];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    //this is hack to tell al sub recipes is updated
    this.recipeSubject.next(recipes[0]);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  selectRecipe(recipe: Recipe) {
    this.recipeSubject.next(recipe);
  }

  getRecipeSubject() {
    return this.recipeSubject;
  }

  addToShoppingList(recipe: Recipe) {
    this.shoppingListService.addIngredients(recipe.ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeSubject.next(recipe);
  }

  editRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeSubject.next(recipe);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeSubject.next(this.recipes[index]);
  }
}
