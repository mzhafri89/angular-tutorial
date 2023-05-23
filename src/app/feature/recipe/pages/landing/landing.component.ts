import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-landing-recipe',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnDestroy {
  selectedRecipe: Recipe | undefined;
  private ingredientSubject: Subscription;

  constructor(private recipeService: RecipeService) {
    this.ingredientSubject = this.recipeService
      .getRecipeSubject()
      .subscribe((recipe: Recipe) => {
        this.selectedRecipe = recipe;
      });
  }

  ngOnDestroy(): void {
    this.ingredientSubject.unsubscribe();
  }
}
