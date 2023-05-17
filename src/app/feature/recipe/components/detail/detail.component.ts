import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  @Input() recipe: Recipe | undefined;

  constructor(private recipeService: RecipeService) {}

  addIngredientToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
  }
}
