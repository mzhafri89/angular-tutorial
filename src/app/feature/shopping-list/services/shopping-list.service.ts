import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/core/models/ingredient.model';
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] | undefined;
  private addIngredientSubject: Subject<Ingredient> | undefined;
  private editIngredientSubject: Subject<Ingredient> | undefined;

  constructor() {
    this.ingredients = [
      new Ingredient('Apple', 5),
      new Ingredient('Tomato', 10),
    ];

    this.addIngredientSubject = new Subject<Ingredient>();
    this.editIngredientSubject = new Subject<Ingredient>();
  }

  getIngredients() {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.addIngredientSubject.next(ingredient);
  }

  updateIngredient(ingredient: Ingredient) {
    const existingIngredientIndex = this.getExistingIngredientIndex(ingredient);

    this.ingredients[existingIngredientIndex] = {
      ...this.ingredients[existingIngredientIndex],
      amount: ingredient.amount,
    };

    this.editIngredientSubject.next(ingredient);
  }

  deleteIngredient(ingredient: Ingredient) {
    const existingIngredientIndex = this.getExistingIngredientIndex(ingredient);

    this.ingredients.splice(existingIngredientIndex, 1);

    this.editIngredientSubject.next(ingredient);
  }

  editIngredient(index: number) {
    this.editIngredientSubject.next(this.ingredients[index]);
  }

  getAddIngredientSubject() {
    return this.addIngredientSubject;
  }

  getEditIngredientSubject() {
    return this.editIngredientSubject;
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...ingredients];
  }

  private getExistingIngredientIndex(ingredient: Ingredient) {
    return this.ingredients.findIndex(
      ({ name }) => name.toLowerCase() === ingredient.name.toLowerCase()
    );
  }
}
