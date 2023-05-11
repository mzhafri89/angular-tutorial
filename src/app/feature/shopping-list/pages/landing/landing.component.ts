import { Component } from '@angular/core';
import { Ingredient } from 'src/app/core/models/ingredient.model';

@Component({
  selector: 'app-landing-shopping-list',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  ingredients: Ingredient[] = [new Ingredient('Apple', 5), new Ingredient('Tomato', 10)];
}
