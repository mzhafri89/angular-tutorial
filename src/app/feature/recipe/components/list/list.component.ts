import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Output() clickRecipe: EventEmitter<Recipe> = new EventEmitter();

  recipes: Recipe[] = [];
  recipeSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRecipes();

    this.recipeSubscription = this.recipeService
      .getRecipeSubject()
      .subscribe(() => this.getRecipes());
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

  getRecipes() {
    this.recipes = this.recipeService.getRecipes();
  }

  navigateToNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
