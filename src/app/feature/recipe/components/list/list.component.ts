import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Output() clickRecipe: EventEmitter<Recipe> = new EventEmitter();

  recipes: Recipe[] = [
    new Recipe(
      'Recipe One',
      'One',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'
    ),
    new Recipe(
      'Recipe Two',
      'Two',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'
    ),
  ];

  handleClickRecipe(recipe: Recipe) {
    this.clickRecipe.emit(recipe);
  }
}
