import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-landing-shopping-list',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService
      .getEventEmitter()
      .subscribe(() => this.fetchIngredients());
  }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  handleAddIngredient(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  fetchIngredients() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
