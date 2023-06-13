import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from 'src/app/share/models/ingredient.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: number;
  mode: string;
  form: FormGroup<{
    name: FormControl<string>;
    image: FormControl<string>;
    description: FormControl<string>;
    ingredients: FormArray<
      FormGroup<{
        name: FormControl<string>;
        amount: FormControl<number>;
      }>
    >;
  }>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //own observable should be cleared
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
    });

    this.route.data.subscribe((data: Data) => {
      this.mode = data['mode'];
    });

    this.initializeForm();
  }

  private initializeForm() {
    let name = null;
    let description = null;
    let image = null;
    let ingredients = new FormArray([]);

    if (this.mode === 'update') {
      const recipe = this.recipeService.getRecipe(this.id);

      name = recipe.name;
      description = recipe.description;
      image = recipe.imageUrl;
      if (recipe.ingredients.length) {
        recipe.ingredients.forEach((ingredient) =>
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required]),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          )
        );
      }
    }

    this.form = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      image: new FormControl(image, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      ingredients,
    });
  }

  submit() {
    const {
      value: { name, description, image, ingredients },
    } = this.form;

    const recipe = new Recipe(
      name,
      description,
      image,
      ingredients as Ingredient[]
    );

    if (this.mode === 'create') {
      this.recipeService.addRecipe(recipe);
    } else {
      this.recipeService.editRecipe(this.id, recipe);
    }

    this.navigateBack();
  }

  getIngredientsControl() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  addIngredientControl() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  deleteIngredientControl(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
