import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item: Recipe | undefined;

  constructor(private recipeService: RecipeService) {}

  handleClick() {
    this.recipeService.getRecipeSelectEventEmitter().emit(this.item);
  }
}
