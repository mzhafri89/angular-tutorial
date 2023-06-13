import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/share/models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-landing-shopping-list',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private addIngredientSubject: Subscription;
  private editIngredientSubject: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.addIngredientSubject = this.shoppingListService
      .getAddIngredientSubject()
      .subscribe(() => this.fetchIngredients());

    this.editIngredientSubject = this.shoppingListService
      .getEditIngredientSubject()
      .subscribe(() => this.fetchIngredients());
  }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  ngOnDestroy(): void {
    this.addIngredientSubject.unsubscribe();
    this.editIngredientSubject.unsubscribe();
  }

  handleAddIngredient(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  fetchIngredients() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  selectIngredient(index: number) {
    this.shoppingListService.editIngredient(index);
  }
}
