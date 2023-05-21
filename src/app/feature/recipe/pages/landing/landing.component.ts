import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-landing-recipe',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  selectedRecipe: Recipe | undefined;

  constructor(private recipeService: RecipeService) {
    this.recipeService
      .getRecipeSelectEventEmitter()
      .subscribe((recipe: Recipe) => {
        this.selectedRecipe = recipe;
      });
  }
}
