import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/core/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] | undefined;
  private eventEmitter: EventEmitter<Ingredient> | undefined;

  constructor() {
    this.ingredients = [
      new Ingredient('Apple', 5),
      new Ingredient('Tomato', 10),
    ];

    this.eventEmitter = new EventEmitter<Ingredient>();
  }

  getIngredients() {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.eventEmitter.emit(ingredient);
  }

  getEventEmitter() {
    return this.eventEmitter;
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...ingredients];
  }
}
