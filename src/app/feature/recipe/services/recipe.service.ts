import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';

//update the providedIn value if this module is later lazy loaded
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] | undefined;
  private recipeSelectEvent: EventEmitter<Recipe> | undefined;

  constructor(private shoppingListService: ShoppingListService) {
    this.recipes = [
      new Recipe(
        'Recipe One',
        'One',
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
        [new Ingredient('Meat', 1), new Ingredient('Froiz', 2)]
      ),
      new Recipe(
        'Recipe Two',
        'Two',
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
        [new Ingredient('Lettuce', 3), new Ingredient('Tomato', 4)]
      ),
    ];

    this.recipeSelectEvent = new EventEmitter<Recipe>();
  }

  getRecipes() {
    return [...this.recipes];
  }

  selectRecipe(recipe: Recipe) {
    this.recipeSelectEvent.emit(recipe);
  }

  getRecipeSelectEventEmitter() {
    return this.recipeSelectEvent;
  }

  addToShoppingList(recipe: Recipe) {
    this.shoppingListService.addIngredients(recipe.ingredients);
  }
}
