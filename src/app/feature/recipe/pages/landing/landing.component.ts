import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-landing-recipe',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  selectedRecipe: Recipe | undefined;

  handleClickRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
