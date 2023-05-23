import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/core/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] | undefined;
  private ingredientSubject: Subject<Ingredient> | undefined;

  constructor() {
    this.ingredients = [
      new Ingredient('Apple', 5),
      new Ingredient('Tomato', 10),
    ];

    this.ingredientSubject = new Subject<Ingredient>();
  }

  getIngredients() {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientSubject.next(ingredient);
  }

  getIngredientSubject() {
    return this.ingredientSubject;
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...ingredients];
  }
}
