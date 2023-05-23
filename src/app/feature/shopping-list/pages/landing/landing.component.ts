import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-landing-shopping-list',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubject: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.ingredientSubject = this.shoppingListService
      .getIngredientSubject()
      .subscribe(() => this.fetchIngredients());
  }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  ngOnDestroy(): void {
    this.ingredientSubject.unsubscribe();
  }

  handleAddIngredient(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  fetchIngredients() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
